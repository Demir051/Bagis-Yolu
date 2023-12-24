const Content = require('../models/content');
const Comment = require('../models/comment');

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

exports.content_details_get = async (req, res) => {
    try {

        const content = await Content.findOne({
            where: {
                id: req.params.content_id
            }
        });

        const comments = await Comment.findAll({
            where: {
                contentId: req.params.content_id
            }
        })

        res.render('content-details', {

            title: content.title,
            content: content,
            comments: comments 
        })

    }catch(err){
        console.log(err)
    }
}

exports.content_details_post = async (req, res) => {
    try {
       
        const {username, comment , contentId} = req.body;

        await Comment.create({
            text: comment,
            userName: username,
            contentId: contentId
        })

        res.redirect(`/content/${contentId}`)

    }catch(err){
        console.log(err)
    }
}