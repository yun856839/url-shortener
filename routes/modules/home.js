const express = require('express')
const Url = require('../../models/url')
const toShortUrl = require('../../public/javascripts/toShortUrl')
const router = express.Router()
const indexUrl = process.env.PORT || 'http://localhost:3000'

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
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

router.get('/:key', (req, res) => {
  const key = req.params.key
  // console.log(key)
  // console.log(indexUrl + key)
  Url.findOne({ shortenedURL: indexUrl + '/' + key })
    .lean()
    .then((url) => {
      // console.log(url)
      res.redirect(url.originURL)
    })
    .catch(err => console.log(err))
})

module.exports = router