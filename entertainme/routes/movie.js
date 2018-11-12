var express = require('express');
var router = express.Router();
var { isCache } = require('../middleware/entertain.middleware')
var { addMovie ,updateMovie, deleteMovie } = require('../controllers/movie.controller')
var { getAll } = require('../controllers/entertain.controller')


router.get('/', isCache, getAll);
router.post('/',isCache, addMovie, getAll);
router.put('/:id',isCache, updateMovie, getAll);
router.delete('/:id',isCache, deleteMovie, getAll);


module.exports = router;