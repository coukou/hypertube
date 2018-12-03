const axios = require('axios')
const cheerio = require('cheerio')
const jsonframe = require('jsonframe-cheerio')

module.exports.getAnimeEpisodes = (id) => {
  return new Promise((resolve, reject) => {
    let episodes = []
    const getEpisodes = async (page) => {
      try {
        const res = await axios.get(`https://horriblesubs.info/api.php?method=getshows&type=show&showid=${id}&nextid=${page}`)
        if (res.data === 'DONE')
          return resolve(episodes)
        const $ = cheerio.load(res.data)
        jsonframe($)
        episodes = episodes.concat(
          $('body').scrape({
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
        )
      } catch (err) {
        console.log(`getEpisodeError:${id}:${err}`)
      }
      getEpisodes(page+1)
    }
    getEpisodes(0)
  })
}

module.exports.getAnimeDetails = (anime) => {
  return new Promise((resolve, reject) => {
    axios.get('https://horriblesubs.info/' + anime.href)
      .then((res) => {
        const id = parseInt(/hs_showid = (\d+)/.exec(res.data)[1])
        const $ = cheerio.load(res.data)
        jsonframe($)
        const details = $('body').scrape({
          desc: '.series-desc > p',
          image: '.series-image > img @ src'
        })
        details.id = id
        details.image = `https://horriblesubs.info`+details.image
        resolve(details)
      })
      .catch(() => {})
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
