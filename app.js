const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const toShortUrl = require('./toShortUrl')
const Url = require('./models/url')
const indexURL = 'http://localhost:3000'

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
        let err = `Short URL existed: ${exist.shortenedURL}`
        return res.render('index', { err, shortUrl: exist.shortenedURL })
      }
      let shortUrl = toShortUrl(url)
      Url.create({
        originURL: url,
        shortenedURL: shortUrl
      })
      return res.render('show', { shortUrl })
    })
    .catch(err => console.log(err))

})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})