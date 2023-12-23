var express = require('express');
var router = express.Router();

const indexController = require('../controller/index');

router.get('/', indexController.index_get);

module.exports = router;
