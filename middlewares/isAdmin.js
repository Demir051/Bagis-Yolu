const User = require("../models/user");

const isAdmin = async (req, res, next) => {

    const fullNameFromSession = req.session.fullName;

    const user = await User.findOne({username: fullNameFromSession})

    if (!user) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
    
    if (user.role == 'admin') {
        next();
    } else {
        res.status(500).send("You are not authorized to view this page");
        
    }
}

module.exports = isAdmin;