const axios = require('axios')

const trackers = [
  'udp://open.demonii.com:1337/announce',
  'udp://tracker.openbittorrent.com:80',
  'udp://tracker.coppersurfer.tk:6969',
  'udp://glotorrents.pw:6969/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://torrent.gresille.org:80/announce',
  'udp://p4p.arenabg.com:1337',
  'udp://tracker.leechers-paradise.org:6969'
]

const createMagnetLink = (name, hash) => {
  const trackers_str = trackers.join('&tr=')
  return `magnet:?xt=urn:btih:${hash}&dn=${encodeURI(name)}&tr=${trackers_str}`
}

module.exports.getFilm = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://yts.am/api/v2/movie_details.json?movie_id=${id}&with_cast=true`)
      .then(res => {
        const movie = res.data.data.movie
        return resolve({
          id: id,
          title: movie.title,
          year: movie.year,
          rating: movie.rating,
          duration: movie.runtime,
          genres: movie.genres,
          synopsis: movie.description_full,
          lang: movie.language,
          thumbnail: movie.large_cover_image,
          cast: movie.cast,
          torrents: movie.torrents.map(torrent => ({
            quality: torrent.quality,
            magnet: createMagnetLink(movie.title, torrent.hash)
          }))
        })
      })
      .catch(err => {
        console.log('ERROR:', err)
      })
  })
}
