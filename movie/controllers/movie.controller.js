const Movie = require('../models/Movie.model')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getMovies: async(req, res) => {
    //console.log(req.headers.cache)
    if (req.headers.cache) {
      res.status(200).json({
        message: 'get Movies from cache',
        data: req.headers.cache
      })
    } else {
      try {
        let tempMovies = await Movie.find()
        client.set('movies', JSON.stringify(tempMovies))
        res.status(200).json({
          message: 'get Movies from database',
          data: tempMovies
        })
      } catch (err) {
        res.status(500).json({
          message: 'Error get movies',
          err
        })
      }
    }
  },
  addMovie: async(req, res) => {
    try { 
      const Newmovie = await new Movie ({
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tag: req.body.tag
      }).save()
      var tempCache = req.headers.cache
      if (!tempCache) {
        tempCache= [];
      }
      tempCache.push(Newmovie)
      client.set('movies', JSON.stringify(tempCache))
      res.status(200).json({
        message: 'movie added',
        data:Newmovie
      })
    } catch (err) {
      res.status(500).json({
        message: 'error to add movie',
        err
      })
    }
  },
  updateMovie: async (req, res) => {
    console.log('edit',req.params.id)
    try {       
        const update = await Movie.updateOne({
          _id: req.params.id
        }, {
          $set: {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tag: req.body.tag
          }
        });
        //var tempCache = req.headers.cache
        let tempMovies = await Movie.find()
        client.set('movies', JSON.stringify(tempMovies))
        res.status(200).json({
          message: 'movie updated',
          data: update
        });
    } catch (err) {
        res.status(500).json({
            message: 'error to update movie',
            err
      });
    }
  },
  deleteMovie: async (req, res) => {
    console.log('delete',req.params.id)
    try {
        const deletemovie = await Movie.deleteOne({_id: req.params.id});
        let tempMovies = await Movie.find()
        client.set('movies', JSON.stringify(tempMovies))
        res.status(200).json({
          message: 'movie deleted',
          data: deletemovie
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'error to delete movie', 
            err
        });
    }
  }
}
