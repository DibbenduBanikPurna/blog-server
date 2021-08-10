const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const cors=require('cors')
const authRouter = require('./Router/AuthRouter')
const userRouter = require('./Router/UserRouter')
const postRouter = require('./Router/PostRouter')
const categoryRouter = require('./Router/CategoryRouter')
const fileUploadRouter = require('./Router/FileUploadRouter')



const app=express()

dotenv.config()

//database connection
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex:true,useFindAndModify: false})
.then(()=>console.log("db connected"))
.catch(err=>console.log(err))






//data parsing
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static('./Public/Uploads/'))

//routing
app.use('/', authRouter)

app.use('/',userRouter)

app.use('/',postRouter)

app.use('/',categoryRouter)

app.use('/',fileUploadRouter)
//app starting server port
app.listen(process.env.PORT,()=>{
    console.log(`Server starts at ${process.env.PORT}`)
})