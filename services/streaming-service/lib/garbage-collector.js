const fs = require('fs')
const path = require('path')
const glob = require('glob')
const rm = require('rimraf')

module.exports = (opts = {}) => {
  setInterval(() => {
    console.log('collecting inactive animes...')
    glob(path.resolve(__dirname, '../animes/**/.metadata'), (err, files) => {
      if (err) return ;
      files.forEach(filename => {
        fs.readFile(filename, (err, data) => {
          if (err) return ;
          const meta = JSON.parse(data)
          const now = Date.now()
          const diff = now - meta.readed_at

          const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

          // don't collect animes under 31 days
          if (Number.isInteger(days) && days < 31) return ;

          // DELETE!
          const dir = path.dirname(filename)
          rm(path.dirname(dir), err => {
            if (err) return console.log(`unable to delete ${dir}`)
            console.log(`${dir} deleted`)
          })
        })
      })
    })
  }, opts.interval || 10000)
}
