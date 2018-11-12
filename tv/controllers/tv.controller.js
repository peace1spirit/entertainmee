const Tvseries = require('../models/tv.model')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getTvseries: async(req, res) => {
    if (req.headers.cache) {
      res.status(200).json({
        message: 'get Tvseries from cache',
        data: req.headers.cache
      })
    } else {
      try {    
        let tvseries = await Tvseries.find()
        client.set('tvseries', JSON.stringify(tvseries))
        res.status(200).json({
          message: 'get Tvseries from database',
          data: tvseries
        })
      } catch (err) {
        console.log(err)
        res.status(500).json({
          message: 'error to get Tvseries',
          err
        })
      }
    }
  },
  addTvseries: async(req, res) => {
    try { 
        const Newtvseries = await new Tvseries ({
          name: req.body.name,
          overview: req.body.overview,
          popularity: req.body.popularity,
          tag: req.body.tag
        }).save()
        var tempCache = req.headers.cache
        if (!tempCache) {
          tempCache= [];
        }
        tempCache.push(Newtvseries)
        client.set('tvseries', JSON.stringify(tempCache))
        res.status(200).json({
          message: 'tvseries added',
          data:Newtvseries
        })
    } catch (err) {
        res.status(500).json({
          message: 'error to add tvseries',
          err
        })
    }
  },
  updateTvseries: async (req, res) => {
    try {
        const update = await Tvseries.updateOne({
          _id: req.params.id
        }, {
          $set: {
            name: req.body.name,
            overview: req.body.overview,
            popularity: req.body.popularity,
            tag: req.body.tag
          }
        });
        //var tempCache = req.headers.cache  
        let tvseries = await Tvseries.find()
        client.set('tvseries', JSON.stringify(tvseries))
        res.status(200).json({
          message: 'Tvseries updated',
          data: update
        });
    } catch (err) {
        res.status(500).json({
            message: 'error to update Tvseries',
            err
      });
    }
  },
  deleteTvseries: async (req, res) => {
    try {
        const deleteseries = await Tvseries.deleteOne({_id: req.params.id});
        let tvseries = await Tvseries.find()
        client.set('tvseries', JSON.stringify(tvseries))
        res.status(200).json({
          message: 'Tvseries deleted',
          data: deleteseries
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'error to delete Tvseries', 
            err
        });
    }
  }
}