const express = require('express')
const postRouter = express.Router()
const Post = require('../models/post.js')

// Get all
postRouter.get('/', (req, res, next) => {
    Post.find((err, posts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(posts)
    })
})

// Post
postRouter.post("/:userID", (req, res, next) => {
    // Get user post object { title, imgUrl }
    const postData = req.body
    // add the .user property to that object, assign the user's ID
    postData.user = req.params.userID
    // Create post object with schema
    const newPost = new Post(postData)
    // Save the new post
    newPost.save((err, newPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newPost)
    })
})

// Get all posts by specific user
postRouter.get("/:userID", (req, res, next) => {
    Post.find({user: req.params.userID}, (err, userPosts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userPosts)
    })
})

module.exports = postRouter