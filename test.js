const Whatanime = require('./main')
const token = 'Your api token';

(async () => {
  try {
    const api = new Whatanime(token)

    let data = await api.search('https://i.ytimg.com/vi/scxlo8z36Ls/maxresdefault.jpg')
    // saekano ♭ Ep.0

    console.log(data)
    let video = await api.previewVideo(data.docs[0].season, data.docs[0].anime, data.docs[0].filename, data.docs[0].at, data.docs[0].tokenthumb)
    console.log(video)
  } catch (e) {
    console.error(e)
  }
})()
