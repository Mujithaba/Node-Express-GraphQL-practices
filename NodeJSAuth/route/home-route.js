const express = require('express');
const { route } = require('./route');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/welcome',authMiddleware,(req,res)=>{
    
    const {username,userId,role}= req.userInfo;
    res.status(200).json({
        message:"Welcome to the Home Page!",
        user:{
            Id:userId,
            username,
            role
        }
    })
})

module.exports=router;