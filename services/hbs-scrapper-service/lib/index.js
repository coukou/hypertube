const axios = require('axios')
const cheerio = require('cheerio')
const jsonframe = require('jsonframe-cheerio')

const getAnimeEpisodes = (id) => {
  return new Promise((resolve, reject) => {
    let episodes = []
    const getEpisodes = async (page) => {
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
              number: '.rls-label > strong | nb',
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
      getEpisodes(page+1)
    }
    getEpisodes(0)
  })
}

const getAnimeDetails = (anime) => {
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
  })
}

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
    const animes = $('body').scrape(frame).animes.slice(0, 1).map(async anime => {
      anime.details = await getAnimeDetails(anime)
      anime.episodes = await getAnimeEpisodes(anime.details.id)
      console.log(anime.details)
    })
  })
