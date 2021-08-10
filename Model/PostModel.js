const mongoose=require('mongoose')


const postSchema=mongoose.Schema({
    title:{
        
        type:String,
        required:true,
        unique:true
    },
    
        description:{

            type:String,
            required:true,
            unique:true
        },
        file:{
            type:String,
          

        },
        username:{
            type:String,
            required:true
        },
        categories:{
            type:Array,
            required:false
        }
    
},{timestamps:true})


const Post=new mongoose.model("Post", postSchema)

module.exports=Post