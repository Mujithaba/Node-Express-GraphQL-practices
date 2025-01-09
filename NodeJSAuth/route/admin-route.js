const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const isAdminUser = require('../middleware/adminMiddleware');
const router= express.Router();


router.get('/adminHome', authMiddleware,isAdminUser,(req,res)=>{
  
  
    res.status(200).json({
        message:"welcome to the admin home",
        user:{
            Id:req.userInfo.userId,
            username:req.userInfo.username,
            role:req.userInfo.role
        }
    })
})


module.exports = router;