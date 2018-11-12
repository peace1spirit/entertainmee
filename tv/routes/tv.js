var express = require('express');
var router = express.Router();
var tvController = require('../controllers/tv.controller')
var { isCache } = require('../middleware/tv.middleware')

router.get('/', isCache, tvController.getTvseries)
router.post('/', isCache, tvController.addTvseries)
router.put('/:id', isCache, tvController.updateTvseries)
router.delete('/:id', isCache, tvController.deleteTvseries)

module.exports = router;

