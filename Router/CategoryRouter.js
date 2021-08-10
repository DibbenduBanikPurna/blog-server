const express=require('express')
const { createCategory, getCategory } = require('../Controller/CategoryController')

const categoryRouter=express.Router()



categoryRouter.post('/category',createCategory)


categoryRouter.get('/category',getCategory)



module.exports=categoryRouter