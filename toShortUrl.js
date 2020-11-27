function toShortUrl(url) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  let collection = lowerCaseLetters + upperCaseLetters + numbers

  let randomNumber = ''
  for (let i = 0; i < 5; i++) {
    randomNumber += collection[Math.floor(Math.random() * collection.length)]
  }

  return url + randomNumber
  // console.log(randomNumber)
}

module.exports = toShortUrl