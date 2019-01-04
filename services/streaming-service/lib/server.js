const fs = require('fs')
const https = require('https')
const path = require('path')
const express = require('express')
const cors = require('cors')
const jwtDecode = require('jwt-decode')
const ffmpeg = require('fluent-ffmpeg')
const pump = require('pump')
const torrentStream = require('torrent-stream');
const mkdirp = require('mkdirp')
const streamBuffers = require('stream-buffers')
const isVideo = require('is-video')

const authService = require('./auth-service')
const libraryService = require('./library-service')

const app = express()

app.use(cors())

const torrents = {}

// we start garbage collector
require('./garbage-collector')()

function createTranscoder(rs) {
  return ffmpeg(rs)
    .outputFormat('webm')
    .videoCodec('libvpx')
    .audioCodec('libvorbis')
    .audioBitrate(128)
    .videoBitrate(1024)
    .outputOptions([
      '-deadline realtime',
      '-error-resilient 1'
    ])
}

function saveMetadata(metadata, cb) {
  fs.writeFile(metadata.metaFilename, JSON.stringify(metadata), (err) => {
    cb(err)
  })
}

app.use((req, res, next) => {
  const { anime, episode, quality } = req.query
  const id = `${anime}-${episode}-${quality}`
  const dir = path.resolve(__dirname, '../animes', id)

  if (torrents[id]) {
    req.torrent = torrents[id]
    // since we should remove file after 1 month of inactivity
    // we should update the last read timestamp for our garbage collector
    req.torrent.metadata.readed_at = Date.now()
    saveMetadata(req.torrent.metadata, () => {})
    return next()
  }


  console.log(anime, episode, quality)
  // we retrieve magnet link here from LibraryService
  libraryService.getAnimeTorrent({anime, episode, quality}, (err, data) => {
    if (err) return res.status(404).end()

    const engine = torrentStream(data.magnet);

    engine.on('error', err => {
      console.log(err)
    })
    engine.on('ready', () => {
      engine.files.forEach(file => {
        if (!isVideo(file.name))
          return ;

        file.metadata = {
          id, anime, episode, quality, dir,
          outFilename: path.resolve(dir, 'video.webm'),
          subFilename: path.resolve(dir, 'sub.vtt'),
          metaFilename: path.resolve(dir, '.metadata'),
          downloaded: false,
          started: false
        }

        torrents[id] = file
        req.torrent = torrents[id]
        
        mkdirp(file.metadata.dir, function (err) {
          if (err) return res.status(500).end('unable to create episode dir')
          fs.access(file.metadata.metaFilename, fs.constants.F_OK, (err) => { 

            // if .metadata file exists we restore it
            if (!err) {
              file.metadata = JSON.parse(fs.readFileSync(file.metadata.metaFilename))
            }

            next() 
          })
        })
      });
    });
  });
})

app.get('/video', (req, res) => {
  // here we download and transcode file if needed
  if (!req.torrent.metadata.started && !req.torrent.metadata.downloaded) {
    req.torrent.metadata.started = true
    const stream = req.torrent.createReadStream()
    createTranscoder(stream)
      .on('start', () => {
        console.log('Downloading and transcoding', req.torrent.metadata.id)
      })
      .on('end', () => {
        console.log('Downloaded', req.torrent.metadata.id)
        req.torrent.metadata.downloaded = true
        req.torrent.metadata.started = false
        saveMetadata(req.torrent.metadata, err => {
          if (err) console.log('unable to save metadata RIP')
        })
      })
      .save(req.torrent.metadata.outFilename)
  }
  if (!req.torrent.metadata.downloaded) {
    return createTranscoder(req.torrent.createReadStream({start: 0}))
      .on('start', () => {
        console.log('streaming and transcoding', req.torrent.metadata.id)
      })
      .on('error', () => {})
      .pipe(res)
  }

  const path = req.torrent.metadata.outFilename
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/webm',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

app.get('/info', (req, res) => {
  console.log('info')
  res.json({downloaded: req.torrent.metadata.downloaded})
})

app.get('/sub', (req, res) => {
  const cmd = ffmpeg(req.torrent.metadata.outFilename)
    .format('webvtt')
    .on('error', () => {})

  // if we not have fully downloaded our torrent that mean we have imomplete subtitles
  // so just send what we got in the pipe
  if (!req.torrent.metadata.downloaded) {
    return cmd.pipe(res)
  }

  // if we alreavy have retrieved sub just send it
  if (req.torrent.metadata.sub) {
    return res.end(req.torrent.metadata.sub)
  }

  // we save sub in metadata
  const buffer = new streamBuffers.WritableStreamBuffer()
  cmd.on('end', () => {
    req.torrent.metadata.sub = buffer.getContentsAsString('utf8')
    saveMetadata(req.torrent.metadata, () => {})
    return res.end(req.torrent.metadata.sub)
  }).pipe(buffer)
})

app.listen(3000)
