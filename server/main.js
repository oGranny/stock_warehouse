import { Meteor } from 'meteor/meteor'

const API_KEY = Meteor.settings.API_KEY
const API_SECRET = Meteor.settings.API_SECRET

Meteor.startup(() => {
  console.log(`Your API key is ${Meteor.settings.API_KEY}`);
  console.log(`Your API secret is ${Meteor.settings.API_SECRET}`);
})

Meteor.methods({

  getApiKey() {
    return API_KEY
  },

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

      // console.log('Response from server:', response.data)
      return response.data
    } catch (error) {
      // console.log('Error making POST request:', error.message)
      throw new Meteor.Error('post-request-failed', error.message)
    }
  },

  fetchStockDetails(data) {
    this.unblock()
    try {
      // console.log(data)
      const response = HTTP.get(`https://api.upstox.com/v2/market-quote/quotes?instrument_key=NSE_EQ%7C${data.id}`, {
        headers: {
          'Authorization': `Bearer ${data.token}`,
          'Accept': 'application/json'
        },
      })
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-CA'); // Use Canadian locale for yyyy-mm-dd format
      year = Number(formattedDate.split('-')[0])
      month = Number(formattedDate.split('-')[1])
      day = Number(formattedDate.split('-')[2])
      let to = `${year - 1}-${month.toString().padStart(2, 0)}-${day.toString().padStart(2, 0)}`
      let from = `${year}-${month.toString().padStart(2, 0)}-${(day - 1).toString().padStart(2, 0)}`
      const history = HTTP.get(`https://api.upstox.com/v2/historical-candle/NSE_EQ%7C${data.id}/day/${from}/${to}`, { "Accept": "application/json" })
      response.data.history = history.data.data.candles
      // console.log(response.data)
      return response.data
    } catch (error) {
      throw new Meteor.Error('api-error', error.message)
    }
  },
})
