const api = require('./api')

api.getFilm(5).then(movie => {
  console.log(movie)
})
