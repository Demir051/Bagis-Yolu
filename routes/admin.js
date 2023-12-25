var express = require('express');
var router = express.Router();
const isAuth = require('../middlewares/auth');
const adminController = require('../controller/admin');
const imageUpload = require('../helpers/image-file');
const isAdmin = require('../middlewares/isAdmin');

// Router'lar

router.get('/adminpanel/kullanicisil/:userid', isAuth, isAdmin ,adminController.kullanicisil_get);

router.post('/adminpanel/kullanicisil/:userid', isAuth, isAdmin, adminController.kullanicisil_post);

router.get('/adminpanel/roldegistir/:userid', isAuth, isAdmin, adminController.roldegistir_get);

router.post('/adminpanel/roldegistir/:userid', isAuth, isAdmin, adminController.roldegistir_post);

router.get('/adminpanel/contents', isAuth, isAdmin, adminController.contents_get);

router.get('/adminpanel/addcontents', isAuth, isAdmin, adminController.addcontents_get);

router.post('/adminpanel/addcontents', isAuth, isAdmin, imageUpload.upload.single('contentImage'), adminController.addcontents_post);

router.get('/adminpanel/users', isAuth, isAdmin, adminController.users_get);

router.get('/adminpanel', isAuth, isAdmin, adminController.admin_panel_get);

module.exports = router;