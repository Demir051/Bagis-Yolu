const User = require('../models/user');

exports.admin_panel_get = async (req, res) => {

    const query = req.query.kullanicisil ? true : false;;

    try {

        const allUsers = await User.findAll();

        const users = allUsers ? allUsers : null;

        res.render('admin/admin-panel', {

            users,

            query
        })

    } catch (err) {

        console.log(err)

    }


}

exports.kullanicisil_get = async (req, res) => {

    const userid = req.params.userid;

    try {

        const user = await User.findByPk(userid);

        res.render('admin/kullanicisil', user ? {
            user
        } : {
            user: null
        })

    } catch (err) {
        console.log(err)
    }

}

exports.kullanicisil_post = async (req, res) => {

    const userid = req.body.userId;

    try {

        await User.destroy({
            where: {
                id: userid
            }
        });

        res.redirect('/adminpanel?kullanicisil=basarili');

    } catch (err) {

        console.log(err);

    }

}