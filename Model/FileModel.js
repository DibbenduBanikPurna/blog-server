const mongoose=require('mongoose')

const fileSchema=mongoose.Schema({
    username:{
        type:String
    },
    filename:{
        type:String
    },
    filepath:{
        type:String
    }
},{
    timestamps:true
})

const File=new mongoose.model('File',fileSchema)

module.exports=File