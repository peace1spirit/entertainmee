var express = require('express');
var router = express.Router();
var { isCache } = require('../middleware/entertain.middleware')
var { addTvseries, updateTvseries, deleteTvseries } = require('../controllers/tv.controller')
var { getAll } = require('../controllers/entertain.controller')


router.get('/', isCache, getAll);
router.post('/',isCache, addTvseries, getAll);
router.put('/:id',isCache, updateTvseries, getAll);
router.delete('/:id',isCache, deleteTvseries, getAll);


module.exports = router;