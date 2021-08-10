const Category=require('../Model/CategoryModel')



const createCategory=(async (req,res)=>{
    try{
        const category=await new Category(req.body)

       await category.save()

       res.status(200).json(category)

    }
    catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
})


const getCategory=(async (req,res)=>{
    try{
        const data=await Category.find({},{__v:0})
        res.status(200).json(data,)
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
})


module.exports={createCategory,getCategory}