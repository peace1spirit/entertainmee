const redis = require("redis");
const client = redis.createClient();

module.exports = {
  isCache: (req, res, next) => {
    client.get('movies', async (err, reply) => {
      if(err) { 
        return res.status(500).json({
            message: 'error to get cache movies',
            err
        }) 
      }
      else if(reply) { 
        req.headers.cache = JSON.parse(reply) 
      }
      next();
    })
  }
}