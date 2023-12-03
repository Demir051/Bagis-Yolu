const User = require('../models/user');

exports.admin_panel_get = async (req, res) => {

    try {

        const allUsers = await User.findAll();

        res.render('admin/admin-panel' , allUsers ? {allUsers} : {allUsers : null})

    } catch (err) {

        console.log(err)

    }


}

exports.kullanicisil_get = async (req , res) => {

    const userid = req.params.userid;

    try {

        const user = await User.findByPk(userid);

        res.render('admin/kullanicisil' , user ? {user} : {user : null})

    } catch (err) {
        console.log(err)
    }

}

exports.kullanicisil_post = async (req , res) => {

    const userid = req.body.userId;

    await User.destroy({where : {id : userid}});

     res.redirect('/admin-panel?kullanicisil=basarili');

}