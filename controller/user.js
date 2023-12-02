exports.user_panel_get = async (req , res ) => {

    const fullName = req.session.fullName;
    const userEmail = req.session.email;

    try{

        res.render('user-panel',{
            fullName,
            userEmail     
        })

    }catch(err){

        console.log(err)

    }
}