import { Meteor } from 'meteor/meteor'

const API_KEY = "c4861abc-2484-4271-910c-022f22ac61f3"
const API_SECRET = "lc69bf0u3v"

Meteor.methods({
  async getAccessToken(code) {
    try {
      const apiUrl = `https://api.upstox.com/v2/login/authorization/token?code=${code}&client_id=${API_KEY}&client_secret=${API_SECRET}&redirect_uri=http://localhost:3000/&grant_type=authorization_code`
      const data = {}
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }

      const response = await new Promise((resolve, reject) => {
        HTTP.call('POST', apiUrl, {
          headers,
          data,
        }, (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
      })

      console.log('Response from server:', response.data)
      return response.data
    } catch (error) {
      console.error('Error making POST request:', error)
      throw new Meteor.Error('post-request-failed', error.message)
    }
  },

  fetchStockDetails(data) {
    this.unblock()
    try {
      console.log(data)
      const response = HTTP.get(`https://api.upstox.com/v2/market-quote/quotes?instrument_key=NSE_EQ%7C${data.id}`, {
        headers: {
          'Authorization': `Bearer ${data.token}`,
          'Accept': 'application/json'
        },
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      throw new Meteor.Error('api-error', error.message)
    }
  },
})
