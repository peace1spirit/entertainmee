var express = require('express');
var route = express.Router();
const { isCache } = require('../middleware/cache.middleware')
const movieController = require('../controllers/movie.controller')

route.get('/', isCache, movieController.getMovies)
route.post('/', isCache, movieController.addMovie)
route.put('/:id',isCache, movieController.updateMovie)
route.delete('/:id', movieController.deleteMovie)
module.exports = route;
