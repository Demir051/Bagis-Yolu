var express = require('express');
var router = express.Router();

const isAuth = require('../middlewares/auth');

const userController = require('../controller/admin');

router.get('/adminpanel/kullanicisil/:userid', isAuth, userController.kullanicisil_get);

router.post('/adminpanel/kullanicisil/:userid', isAuth, userController.kullanicisil_post);

router.get('/adminpanel' , isAuth   , userController.admin_panel_get);

module.exports = router;