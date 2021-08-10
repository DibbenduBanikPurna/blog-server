const express=require('express')
const {signUp, SignIn} = require('../Controller/AuthController')
const multer=require('multer')
const authRouter=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('../Model/UserModel')

//Register
//authRouter.post('/register',  signUp)
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "Public/Uploads")
    },
    filename:(req,file,cb)=>{
        
        
        cb(null, file.originalname)
    }
})
const upload=multer({storage:storage})
authRouter.post('/register', upload.any(), async(req,res)=>{
    //console.log(req.body)

    try{
        const hashedPassword= await bcrypt.hash(req.body.password,10)
        const user=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            profilePic:req.body.profilePic


        })

        await user.save()

        res.status(200).json({
            success:"Registration success"
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({
            err:"already registered!!"
        })
    }

})

//Login
authRouter.post('/login',SignIn)

module.exports=authRouter