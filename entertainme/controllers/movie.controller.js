var axios = require('axios')
var redis = require('redis')
var client = redis.createClient()

module.exports = {

  addMovie: async (req, res, next) => {
    //  console.log('jalan')
    try {
      await axios({
        method: 'post',
        url: `http://localhost:3001/movies`,
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
  updateMovie: async (req, res, next) => {
    try {
      await axios({
        method: 'put',
        url: `http://localhost:3001/movies/${req.params.id}`,
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
 
  deleteMovie: async (req, res, next) => {
    try {
      console.log(req.body)
      await axios({
        method: 'delete',
        url: `http://localhost:3001/movies/${req.params.id}`,
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