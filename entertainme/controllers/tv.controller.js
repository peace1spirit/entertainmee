var axios = require('axios')
var redis = require('redis')
var client = redis.createClient()

module.exports = {

  addTvseries: async (req, res, next) => {
    console.log('add tv')
    try {
      await axios({
        method: 'POST',
        url: `http://localhost:3002/tv`,
        data: req.body
      })
      req.updatecache = true
      next()
    } catch (err) {
      return res.status(500).json({
        message: 'error to add movie',
        err
      })
    }
  },
  updateTvseries: async (req, res, next) => {
    try {
      await axios({
        method: 'PUT',
        url: `http://localhost:3002/tv/${req.params.id}`,
        data: req.body
      })
      req.updatecache = true
      next()
    } catch (err) {
      return res.status(500).json({
        message: 'error to update movie',
        err
      })
    }
  },
 
  deleteTvseries: async (req, res, next) => {
    try {
      console.log(req.body)
      await axios({
        method: 'delete',
        url: `http://localhost:3002/tv/${req.params.id}`,
        data: req.body
      })
      req.updatecache = true
      next()
    } catch (err) {
      return res.status(500).json({
        message: 'error to delete movies data',
        err
      })
    }
  },
}