var axios = require('axios')
var redis = require('redis')
var client = redis.createClient()

module.exports = {
  getAll: async (req, res) => {
    if(!req.updatecache) {
        res.status(200).json({
          message: 'get all data from cache',
          data: req.headers.cache
        })
      } else {
        try {
          const movies = await axios({
            method: 'GET',
            url: 'http://localhost:3001/movies'
          })
        
          const tvseries = await axios({
            method: 'GET',
            url: 'http://localhost:3002/tv'
          })
        
          let tempAll = {
            movies: movies.data,
            tvseries: tvseries.data
          }

          client.set('entertainme', JSON.stringify(tempAll))
        
          return res.status(200).json({
            message: 'get all data from axios',
            data: tempAll
          })
        } catch (err) {
          return res.status(500).json({
            message: 'error to get all data',
            err
          })
        }
      }
  }
}