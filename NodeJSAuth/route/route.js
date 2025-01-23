const express = require('express')
const {registerUser,loginUser, changePassword}= require('../controller/auth-controller');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

// all routes related to authentication and autherizations
router.post('/register',registerUser);
router.post('/login',loginUser);
// change password
router.post('/change-password',authMiddleware,changePassword)


module.exports = router