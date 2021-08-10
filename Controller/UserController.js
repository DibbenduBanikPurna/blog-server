const User=require('../Model/UserModel')
const bcrypt=require('bcrypt')
const Post=require('../Model/PostModel')

//update


const updateUser=(async (req,res)=>{
    //console.log(req.body)
    if(req.body.id ===req.params.id){
      if(req.body.password){
          const salt=await bcrypt.genSalt(10)
          req.body.password=await bcrypt.hash(req.body.password,salt)
      }
    

    try{
      const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

      res.status(200).json(user)
}
    catch(err){
        console.log(err.message)
        res.status(400).send(err.message)
    }
}
else{
    res.status(401).json("You can update only your account")
}

})

//delete
const deleteUser=(async (req,res)=>{
    if(req.body.userId===req.params.id){

    try{

        const user=await User.findById(req.params.id)
    

    try{
        await Post.deleteMany({username:user.username})
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("data deleted successfully")

    }
    catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
}   catch(err){
    console.log(err.message)
    res.status(400).send("user not found")
}
    }
    else{
        res.status(401).json("you can delete only your account")
    }

})


//getsingleuser
const getUser=(async (req,res)=>{

    try{

        const user=await User.find({_id:req.params.id},{password:0, __v:0})
        res.status(200).send(user)

    }
    catch(err){
        console.log(err.message)
        res.status(400).send(err.message)
    }
})

module.exports={updateUser,deleteUser,getUser}