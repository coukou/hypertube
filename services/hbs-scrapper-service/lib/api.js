const axios = require('axios')
const cheerio = require('cheerio')
const jsonframe = require('jsonframe-cheerio')

module.exports.getAnimeEpisodes = (id) => {
  return new Promise((resolve, reject) => {
    let episodes = []
    const getEpisodes = async (page) => {
      try {
        const res = await axios.get(`https://horriblesubs.info/api.php?method=getshows&type=show&showid=${id}&nextid=${page}`)
        if (res.data === 'DONE') {
          return resolve(episodes)
        }
        const $ = cheerio.load(res.data)
        jsonframe($)
        const _episodes = $('body').scrape({
          episodes: {
            _s: '.rls-info-container',
            _d: [{
              date: '.rls-date',
              number: '.rls-label > strong',
              qualities: {
                _s: '.rls-link',
                _d: [{
                  quality: '.rls-link-label || \\d+ | number',
                  magnet: '.hs-magnet-link > a @ href'
                }]
              }
            }]
          }
        }).episodes
        episodes = episodes.concat(_episodes)
        getEpisodes(page+1)
      } catch (err) {
        console.log(err)
        console.log(`getEpisodeError:${id}`)
      }
    }
    getEpisodes(0)
  })
}

module.exports.getAnimeDetails = (anime) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURI(anime.title)}`)
      .then((res) => {
        if (!res.data.data || !res.data.data[0]) return resolve({})
        const details = res.data.data[0].attributes
        axios.get('https://horriblesubs.info/' + anime.href)
          .then((res2) => {
            const id = parseInt(/hs_showid = (\d+)/.exec(res2.data)[1])
						resolve({
							synopsis: details.synopsis,
							thumbnail: details.posterImage.original,
							popularity: details.popularityRank,
							id: id
						})
          })
      })
      .catch(err => {})
  })
}

module.exports.getAnimes = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://horriblesubs.info/shows/')
      .then(res => {
        const $ = cheerio.load(res.data)
        jsonframe($)
        const frame = {
          animes: {
            _s: '.ind-show',
            _d: [{ 
              title: 'a',
              href: 'a @ href',
            }]
          }
        }
        resolve($('body').scrape(frame).animes)
      })
      .catch(reject)
  })
}
