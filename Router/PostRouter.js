const express=require('express')
const { updatePost, getAllPost, getSinglePost, deletePost, createPost } = require('../Controller/PostController')

const postRouter=express.Router()

//create post

postRouter.post('/post',createPost)

postRouter.put('/post/:id',updatePost)


postRouter.get('/post/:id',getSinglePost)

postRouter.get('/post',getAllPost)

postRouter.delete('/post/:id',deletePost)




module.exports=postRouter