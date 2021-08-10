const express=require('express')
const {updateUser, deleteUser, getUser} = require('../Controller/UserController')

const userRouter=express.Router()


//update profile

userRouter.put('/user/:id', updateUser)
   
 //delete profile
 
 userRouter.delete('/user/:id',deleteUser)

 //get data
 userRouter.get('/user/:id',getUser)



module.exports=userRouter