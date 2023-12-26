const User = require('../models/user');
const Content = require('../models/content');
const slugify = require('../helpers/slugify');

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

            title: "Users"
        })

    } catch (err) {

        console.log(err)

    }


}

exports.kullanicisil_get = async (req, res) => {

    const slug = req.params.slug;

    try {

        const user = await User.findOne({
            where: {
                slugUrl: slug
            }
        });

        res.render('admin/delete-user', user ? {user} : {user: null})

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
            title: "Contents",
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
            title: "Add Contents",
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
            url: url,
            slugUrl : slugify(title)
        })

        res.redirect('/adminpanel/contents')

    } catch (err) {
        console.log(err)
    }
}

exports.roldegistir_get = async (req, res) => {

    const slug = req.params.slug;

    try{

        const user = await User.findOne({
            where: {
                slugUrl: slug
            }
        });

        res.render('admin/change-role',{ 
            user : user || {},
            title: "Change Role"
        })

    }catch(err){
        console.log(err)
    }
}

exports.roldegistir_post = async (req, res) => {
    const userid = req.body.userid;

    try {
        const user = await User.findOne({
            where: {
                id: userid
            }
        });

        if (user) {
            await user.update({
                role: req.body.new_role
            });

            res.redirect('/adminpanel/users');
        } else {
            res.status(404).send('User not found');
        }

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.deletecontent_get = async (req, res) => {

    const slug = req.params.slug;

    try{

        const content = await Content.findOne({
            where: {
                slugUrl: slug
            }
        });

        res.render('admin/delete-content',{ 
            content : content || {},
            title: "Delete Content"
        })
    }catch(err){   
        console.log(err)
    }

}

exports.deletecontent_post = async (req, res) => {
    
        const contentId = req.body.contentId;
    
        try{
    
            const content = await Content.findOne({
                where: {
                    id: contentId
                }
            });
    
            if (content) {
                await content.destroy();
                res.redirect('/adminpanel/contents');
            } else {
                res.status(404).send('Content not found');
            }
    
        }catch(err){
            console.log(err)
        }
}