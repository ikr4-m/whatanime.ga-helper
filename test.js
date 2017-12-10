const Whatanime = require('./main')
const token = 'your token';

(async () => {
  try {
    const api = new Whatanime(token)

    let data = await api.search('https://i.ytimg.com/vi/scxlo8z36Ls/maxresdefault.jpg')
    // saekano ♭ Ep.0

    console.log(data)
  } catch (e) {
    console.error(e)
  }
})()
