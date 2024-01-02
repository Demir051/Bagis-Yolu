const User = require("../models/user");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { isConstructorDeclaration } = require("typescript");
const slugify = require("../helpers/slugify");

exports.user_panel_get = async (req , res ) => {

    const fullName = req.session.fullName;
    const userEmail = req.session.email;

    const usernameEditQery = req.query.usernameedit ? req.query.usernameedit : false ;


    const user = await User.findOne({
        where:{
            email : userEmail,
            username : fullName
        }
    })

    if(!user){
        return res.status(404).render('404')
    }

    try{

        res.render('user/user-panel',{
            fullName : fullName,
            userEmail : userEmail,
            userSlugUrl : user.slugUrl,
            userRole : user.role,
            usernameEditQery : usernameEditQery
        })

    }catch(err){

        console.log(err)

    }
}

exports.user_edit_get = async (req , res ) => {

    const slug = req.params.slug

    const user = await User.findOne({
        where:{
            slugUrl :slug
        }
    })

    if(!user){
        return res.status(404).render('404')
    }

    try{

        res.render('user/user-edit',{
            username : user.username,
            userId : user.id,
        })

    }catch(err){

        console.log(err)

    }
}

exports.user_edit_post = async (req , res ) => {

    const username = req.body.fullName.trim();
    const slug = req.params.slug;
    const password = req.body.password.trim();
    const confirmPassword = req.body.confirmPassword.trim();

    try{

        const user = await User.findOne({where : {slugUrl : slug}});

        if(!user){
            return res.status(404).render('404')
        }

        const userMatch = await User.findOne({
            where : {
                username : username
            }
        });

        if(userMatch){
            return res.render('user/user-edit',{
                username : username,
                errorMessage : 'Bu kullanıcı adı zaten alınmış'
            })
        }

        if(username.length < 3){
            return res.render('user/user-edit',{
                username : username,
                errorMessage : 'Kullanıcı adı 3 karakterden az olamaz'
            })
        }

        if(password !== confirmPassword){
            return res.render('user/user-edit',{
                username : username,
                errorMessage : 'Şifreler eşleşmiyor'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if(isPasswordCorrect){

            await user.update({
                username : username,
                slugUrl : slugify(username)
            })

            req.session.fullName = username;
            return res.redirect('/profil?usernameedit=basarili');

        }else{

            return res.render('user/user-edit',{
                username : username,
                errorMessage : 'Şifre yanlış'
            })

        }

    }catch(err){

        console.log(err)

    }

}
