exports.user_panel_get = async (req , res ) => {

    try{

        res.render('user-panel')

    }catch(err){

        console.log(err)

    }
}