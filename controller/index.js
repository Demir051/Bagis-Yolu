const Content = require('../models/content');

exports.index_get = async (req, res) => {
    
        try {

            const allContents = await Content.findAll({
                attributes: ["title","imagePath","id"]
            });
    
            res.render('index', {
    
                title: "Anasayfa",
                contents: allContents
            })
    
        } catch (err) {
    
            console.log(err)
    
        }
}