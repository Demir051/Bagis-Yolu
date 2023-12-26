const Content = require('../models/content');
const Comment = require('../models/comment');

exports.index_get = async (req, res) => {
    
        try {

            const allContents = await Content.findAll({
                attributes: ["title","imagePath","id","slugUrl"]
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
                slugUrl: req.params.slug
            }
        });

        const comments = await Comment.findAll({
            where: {
                contentId: content.id
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

        const content = await Content.findOne({
            where:{
                id: contentId
            }
        })

        await Comment.create({
            text: comment,
            userName: username,
            contentId: contentId
        })

        res.redirect(`/content/${content.slugUrl}`)

    }catch(err){
        console.log(err)
    }
}