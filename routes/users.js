var express = require('express');
var router = express.Router();

const isAuth = require('../middlewares/auth');

const userController = require('../controller/user')

// user controller

router.get('/profil' , userController.user_panel_get);

module.exports = router;
