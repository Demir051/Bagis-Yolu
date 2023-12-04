var express = require('express');
var router = express.Router();

const authController = require('../controller/auth');

/* GET users listing. */
router.get('/login', authController.login_get);

router.post('/login', authController.login_post);

router.get('/register', authController.register_get);

router.post('/register', authController.register_post);

router.get('/logout', authController.logout_get);

module.exports = router;