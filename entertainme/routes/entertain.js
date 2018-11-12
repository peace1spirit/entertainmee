var express = require('express');
var router = express.Router();
var  {isCache} = require('../middleware/entertain.middleware')
var { getAll } = require('../controllers/entertain.controller')

router.get('/', isCache , getAll);

module.exports = router;
