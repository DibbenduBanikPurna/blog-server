const Post=require('../Model/PostModel')



const createPost=(async (req,res)=>{
    //console.log(req.body)
    try{

        const post=await new Post(req.body)

        await post.save()
        res.status(200).json(post)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
})



const updatePost=(async (req,res)=>{
    //console.log(req.body)

    try{
        const post=await Post.findById(req.params.id)
        if(post.username===req.body.username){

            try{

          await Post.updateOne({_id:req.params.id},{title:req.body.info.title, description:req.body.info.description})
                res.status(200).json("data updated successfully")
            }
            catch(err){
                console.log(err.message)
                res.status(400).json(err.message)

            }
        }
        else{
            res.status(401).json("you can update only your account")

        }
    }
    catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
})


const deletePost=(async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)

        if(post.username===req.body.username){
            try{
                await post.delete()
                res.status(200).json("post deleted successfully")
            }
            catch(err){
                console.log(err.message)
                res.status(400).json(err.message)
            }
        }
        else{
           
            res.status(400).json("You can delete only your post")
        }
        

    }
    catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
})


const getSinglePost=(async (req,res)=>{

    try{
        const post=await Post.findById(req.params.id)
       
        res.status(200).json({post,})
       
    }
    catch(err){

     
        console.log(err.message)
        res.status(400).json(err.message)
    }
})


const getAllPost=(async (req,res)=>{
    const username=req.query.user
    const catname=req.query.cat
    try{
        let posts;
        if(username){
            posts=await Post.find({username})
        }
        else if(catname){
            posts=await Post.find({
                categories:{
                    $in:[catname]
                }
            })
        }
        else{
            posts=await Post.find({})
        }

        res.status(200).send(posts)
        
    }
    catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
})


module.exports={createPost,updatePost,deletePost,getAllPost,getSinglePost}