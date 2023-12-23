var express = require('express');
var router = express.Router();
const isAuth = require('../middlewares/auth');
const adminController = require('../controller/admin');
const imageUpload = require('../helpers/image-file');

// Router'lar

router.get('/adminpanel/kullanicisil/:userid', isAuth, adminController.kullanicisil_get);

router.post('/adminpanel/kullanicisil/:userid', isAuth, adminController.kullanicisil_post);

router.get('/adminpanel/contents', isAuth, adminController.contents_get);

router.get('/adminpanel/addcontents', isAuth, adminController.addcontents_get);

router.post('/adminpanel/addcontents', isAuth, imageUpload.upload.single('contentImage'), adminController.addcontents_post);

router.get('/adminpanel/users', isAuth, adminController.users_get);

router.get('/adminpanel' , isAuth   , adminController.admin_panel_get);

module.exports = router;