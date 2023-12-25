const User = require("../models/user");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { isConstructorDeclaration } = require("typescript");

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
            userId : user.id,
            userRole : user.role,
            usernameEditQery : usernameEditQery
        })

    }catch(err){

        console.log(err)

    }
}

exports.user_edit_get = async (req , res ) => {

    const userId = req.params.userid

    const user = await User.findOne({
        where:{
            id : userId
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
    const userId = req.params.userid;
    const password = req.body.password.trim();
    const confirmPassword = req.body.confirmPassword.trim();

    try{

        const user = await User.findByPk(userId);

        if(!user){
            return res.status(404).render('404')
        }

        if(password !== confirmPassword){
            return res.render('user/user-edit',{
                username : username,
                userId : userId,
                errorMessage : 'Şifreler eşleşmiyor'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if(isPasswordCorrect){

            await user.update({
                username : username,
            })

            req.session.fullName = username;

            return res.redirect('/profil?usernameedit=basarili');

        }else{

            return res.render('user/user-edit',{
                username : username,
                userId : userId,
                errorMessage : 'Şifre yanlış'
            })

        }

    }catch(err){

        console.log(err)

    }

}
