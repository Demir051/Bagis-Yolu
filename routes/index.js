var express = require('express');
var router = express.Router();

const indexController = require('../controller/index');

router.get('/', indexController.index_get);

router.get('/content/:slug', indexController.content_details_get);

router.post('/content/:slug', indexController.content_details_post);

module.exports = router;
