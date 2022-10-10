const Post =require('../models/post')
// const { Op } = require('sequelize');

exports.loadPosts = async function (lastId){

        const posts = await Post.findAll({
                attributes:['id','text']})   //임시
        
        return posts
    }