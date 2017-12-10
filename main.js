const request = require('request-promise')
const base64 = require('node-base64-image')
const querystring = require('querystring')

const uri = 'https://whatanime.ga/'

class Whatanime {
  /**
   * It is a collection of functions that are easy to use whatanime.ga.
   * @param {string} apiKey your whatnaime.ga api key
   */
  constructor (apiKey) {
    if (typeof apiKey === 'string') {
      this.apiKey = apiKey
      this.uri = {
        search: uri + 'api/search?token=' + this.apiKey
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
   * Encodes the image to base64.
   * @param {string} image 
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
