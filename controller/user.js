const User = require("../models/user");

exports.user_panel_get = async (req , res ) => {

    const fullName = req.session.fullName;
    const userEmail = req.session.email;

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
            userId : user.id   
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

        const user = await User.findOne({
            where:{
                id : userId
            }
        });

        if(!user){
            return res.status(404).render('404')
        }

        if(password !== confirmPassword){
            return res.status(400).render('user/user-edit',{
                username : username,
                userId : userId,
                errorMessage : 'Şifreler eşleşmiyor'
            })
        }

        await user.update({
            username : username,
        })

        res.redirect('/user/profil');

    }catch(err){

        console.log(err)

    }

}