const User=require('../Model/UserModel')
const bcrypt=require('bcrypt')
const multer=require('multer')
const jwt=require('jsonwebtoken')
//register
// 

const signUp=(async (req,res)=>{
    //console.log(req.body)

    try{
        const hashedPassword= await bcrypt.hash(req.body.password,10)
        const user=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            


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


//login

const SignIn=(async (req,res)=>{
   // console.log(req.body)
    try{
        const user=await User.findOne({email:req.body.email})
        if(user){

            const isValidPassword=bcrypt.compare(req.body.password, user.password)
            if(isValidPassword){
                const token=jwt.sign({
                    username:user.username,
                    email:user.email,
                    id:user._id

                },'sadasdakslnslaknalsndslandsaklnl',{
                    expiresIn:'24h'
                })

                res.status(200).cookie('token', token).json({
                    token,
                   username:user.username,
                   email:user.email,
                   id:user._id,
                   pic:user.profilePic,
                   success:"Login Successfully"
                   
                })

            }
            else{
                res.status(500).json({
                    err:"Login Failed!"
                })
            }

        }
        else{
            res.status(500).json({
                err:"Login Failed!"
            })
        }
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({
            err:"Login Failed!"
        })
    }
    
})

module.exports={signUp, SignIn}