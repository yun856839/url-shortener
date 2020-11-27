const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const toShortUrl = require('./toShortUrl')
const Url = require('./models/url')
const indexUrl = 'http://localhost:3000/'

const app = express()
const PORT = 3000

//  -------------MONGOOSE 連線設定---------------

mongoose.connect('mongodb://localhost/url-shortener', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//  -------------MONGOOSE 連線設定---------------

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const url = req.body.url
  Url.findOne({ originURL: url })
    .lean()
    .then(exist => {
      if (exist) {
        let err = `Short URL existed: `
        return res.render('index', { err, shortUrl: exist.shortenedURL })
      }
      let shortUrl = toShortUrl(indexUrl)
      Url.find()
        .lean()
        .then((urls) => {
          urls.forEach((url) => {
            while (url.shortenedURL.includes(shortUrl)) {
              shortUrl = toShortUrl(indexUrl)
            }
            return shortUrl
          })
        })
      Url.create({
        originURL: url,
        shortenedURL: shortUrl
      })
      return res.render('show', { shortUrl })
    })
    .catch(err => console.log(err))
})

app.get('/:key', (req, res) => {
  const key = req.params.key
  // console.log(key)
  // console.log(indexUrl + key)
  Url.findOne({ shortenedURL: indexUrl + key })
    .lean()
    .then((url) => {
      // console.log(url)
      res.redirect(url.originURL)
    })
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})