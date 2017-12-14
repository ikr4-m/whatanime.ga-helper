const request = require('request-promise')
const base64 = require('node-base64-image')
const querystring = require('querystring')

const uri = 'https://whatanime.ga/'

/**
 * Whatanime helper class
 */
class Whatanime {
  /**
   * It is a collection of functions that are easy to use whatanime.ga.
   * @param {string} apiKey your whatnaime.ga api key
   */
  constructor (apiKey) {
    if (typeof apiKey === 'string') {
      this.apiKey = apiKey
      this.uri = {
        search: uri + 'api/search?token=' + this.apiKey,
        me: uri + 'api/me?token=' + this.apiKey,
        list: uri + 'api/list?token=' + this.apiKey,
        previewImage: uri + 'thumbnail.php?season={season}&anime={anime}&file={filename}&t={at}&token=' + this.apiKey,
        previewVideo: uri + 'preview.php?season={season}&anime={anime}&file={filename}&t={at}&token=' + this.apiKey
      }
      this.ready = true
    } else {
      throw Error('apiKey is must string')
    }
  }

  /**
   * This is a function that checks if this class is ready.
   */
  isReady () {
    if (this.ready !== true) {
      throw Error('is not ready')
    }
  }

  /**
   * Find out what animations are based on images.
   * @param {string} image The uri or file path of the image to retrieve.
   */
  search (image) {
    return new Promise(async (resolve, reject) => {
      try {
        this.isReady()
        if (typeof image !== 'string') {
          reject(Error('image is must string'))
        } else {
          const data = await this.imgEncode(image)

          const formData = querystring.stringify({image: data})

          let response = await request({
            uri: this.uri.search,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': formData.length
            },
            body: formData,
            method: 'POST'
          })
          resolve(response)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * You can verify that your API Key is valid.
   */
  me () {
    return new Promise(async (resolve, reject) => {
      try {
        this.isReady()
        const response = await request({
          uri: this.uri.me
        })
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * Get a list of all indexed anime (for search filtering)
   */
  list () {
    return new Promise(async (resolve, reject) => {
      try {
        this.isReady()
        const response = await request({
          uri: this.uri.list
        })
        resolve(response)
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * An animation preview is received as an image.
   * @param {string} season It is season of animation to receive preview.
   * @param {string} anime The name of the animation to receive the preview.
   * @param {string} filename The file name of the animation to receive the preview.
   * @param {string} at Which part of the animation will you get? You can set it here.
   */
  previewImage (season, anime, filename, at) {
    return new Promise(async (resolve, reject) => {
      try {
        this.isReady()
        if (typeof season !== 'string') {
          reject(Error('season is must string'))
        } else if (typeof anime !== 'string') {
          reject(Error('anime is must string'))
        } else if (typeof filename !== 'string') {
          reject(Error('filename is must string'))
        } else if (typeof at !== 'string') {
          reject(Error('at is must string'))
        } else {
          let response = await request({
            uri: this.uri.previewImage
              .replace(/{season}/, season)
              .replace(/{anime}/, anime)
              .replace(/{filename}/, filename)
              .replace(/{at}/, at)
          })
          resolve(response)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * An animation preview is received as a video.
   * @param {string} season It is season of animation to receive preview.
   * @param {string} anime The name of the animation to receive the preview.
   * @param {string} filename The file name of the animation to receive the preview.
   * @param {string} at Which part of the animation will you get? You can set it here.
   */
  previewVideo (season, anime, filename, at) {
    return new Promise(async (resolve, reject) => {
      try {
        this.isReady()
        if (typeof season !== 'string') {
          reject(Error('season is must string'))
        } else if (typeof anime !== 'string') {
          reject(Error('anime is must string'))
        } else if (typeof filename !== 'string') {
          reject(Error('filename is must string'))
        } else if (typeof at !== 'string') {
          reject(Error('at is must string'))
        } else {
          let response = await request({
            uri: this.uri.previewVideo
              .replace(/{season}/, season)
              .replace(/{anime}/, anime)
              .replace(/{filename}/, filename)
              .replace(/{at}/, at)
          })
          resolve(response)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * Encodes the image to base64.
   * @param {string} image The file path or URL of the image to encode.
   */
  imgEncode (image) {
    return new Promise((resolve, reject) => {
      base64.encode(image, {
        string: true
      },
      (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }
}

module.exports = Whatanime
