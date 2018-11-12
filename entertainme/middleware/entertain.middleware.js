const redis = require("redis");
const client = redis.createClient();

module.exports = {
    isCache: (req, res, next) => {
      client.get('entertainme', async (err, reply) => {
        req.updatecache=true
        if(err) { 
          return res.status(500).json({
              message: 'error to get cache tvseries',
              err
          }) 
        }
        else if(reply) { 
          req.updatecache=false
          req.headers.cache = JSON.parse(reply) 
        }
        next();
      })
    }
  }