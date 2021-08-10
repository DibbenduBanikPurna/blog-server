const express=require('express')
const multer=require('multer')
const path=require('path')
const Post=require('../Model/PostModel')
const fileUploadRouter=express.Router()

const fileUpload=path.join(__dirname,'Public')
//console.log(fileUpload)

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "Public/Uploads")
    },
    filename:(req,file,cb)=>{
        
        
        cb(null, file.originalname)
    }
})
const upload=multer({storage:storage})

fileUploadRouter.post('/api/uploads',upload.any(), async (req,res)=>{
    console.log(req.body)
   //console.log(req.body.file)
   
    try{
        //console.log(req.file)
     
         
         const post=await new Post({
             username:req.body.username,
             title:req.body.title,
             description:req.body.description,
             file:req.body.filename
         })
         await post.save()
    
        res.status(200).json("file has been uploaded")
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
   
})
module.exports=fileUploadRouter