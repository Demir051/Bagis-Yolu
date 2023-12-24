const User = require('../models/user');
const Content = require('../models/content');

exports.admin_panel_get = async (req, res) => {

    try {

        res.render('admin/admin-panel')

    } catch (err) {

        console.log(err)

    }


}

exports.users_get = async (req, res) => {

    const query = req.query.kullanicisil ? true : false;;

    try {

        const allUsers = await User.findAll();

        const users = allUsers ? allUsers : null;

        res.render('admin/users', {

            users,

            query,

            title: "Kullanıcılar"
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

        res.redirect('/adminpanel/users?kullanicisil=basarili');

    } catch (err) {

        console.log(err);

    }

}

exports.contents_get = async (req, res) => {

    try {

        const allContents = await Content.findAll();

        res.render('admin/contents', {
            title: "İçerikler",
            contents: allContents ? allContents : null
        })

    } catch (err) {

        console.log(err)

    }
}

exports.addcontents_get = async (req, res) => {

    const urlError = req.query.url;

    try {

        res.render('admin/addcontents',{
            title: "İçerik Ekle",
            urlError
        })

    } catch (err) {
        console.log(err)
    }
}

exports.addcontents_post = async (req, res) => {
    try {

        const {
            title,
            content,
            url
        } = req.body;
        const image = req.file.filename

        if ( !url.includes('https://') ) return res.redirect('/adminpanel/addcontents?url=Url%20https%20ile%20başlamalıdır.')

        await Content.create({
            title: title,
            content: content,
            imagePath: image,
            url: url
        })

        res.redirect('/adminpanel/contents')

    } catch (err) {
        console.log(err)
    }
}