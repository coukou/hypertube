const axios = require('axios')
const cheerio = require('cheerio')
const jsonframe = require('jsonframe-cheerio')

function getEpisodes(page) {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.shanaproject.com/subbertag/3275/${page}/`).then(res => {
			const $ = cheerio.load(res.data)
			jsonframe($)
			const frame = {
				episodes: {
					_s: '.release_block',
					_d: [{
						no: '.release_episode',
						anime: '.release_title a',
						quality: '.rel_x > div:nth-child(1) > div:nth-child(1) || Quality: (.+)p',
						size: '.release_size',
						info: 'div.release_row_first > div.release_title > div.release_info > a @ href'
					}]
				}
			}
			resolve($('body').scrape(frame).episodes.filter(e => {
				return /^(\d+)$/.test(e.no) && e.info !== undefined
			}))
		}).catch(err => {
			resolve([])
		})
	})
}

module.exports.getAnimeDetails = (title) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURI(title)}`)
      .then((res) => {
        if (!res.data.data || !res.data.data[0]) return resolve({})
        const details = res.data.data[0].attributes
        resolve({
          synopsis: details.synopsis,
          thumbnail: details.posterImage.original,
          popularity: details.popularityRank
        })
      })
  })
}

module.exports.getMagnet = (q) => {
	return new Promise((resolve, reject) => {
		axios.get(q.info).then(res => {
			const $ = cheerio.load(res.data)
			jsonframe($)
      const frame = {
        magnet: 'div.details > ul > li:nth-child(18) > a @ href'
      }
      resolve($('body').scrape(frame).magnet)
		}).catch(err => resolve())
	})
}

module.exports.getAnimes = (opts = {}) => {
	const animes = {}
	let concurent = opts.concurent || 10
	let page = opts.page || 1
	return new Promise((resolve, reject) => {
		function fetchEpisodes(p) {
			getEpisodes(p).then(episodes => {
				if (episodes.length === 0) {
					if (--concurent <= 0) {
						return resolve(animes)
					}
				}
				for (let e of episodes) {
					if (!animes[e.anime]) {
						animes[e.anime] = {}
					}
          if (!animes[e.anime][e.no])
            animes[e.anime][e.no] = { qualities: [] }
          animes[e.anime][e.no].qualities.push({
            quality: e.quality,
            info: e.info,
          })
				}
        setTimeout(() => fetchEpisodes(page++), 300)
			})
		}
		for (let i = 0; i < concurent; i++)
			fetchEpisodes(page++)
	})
}
