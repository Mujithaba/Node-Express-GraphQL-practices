

const isAdminUser = (req,res,next)=>{
    if (req.userInfo.role !=='admin') {
        return res.status(401).json({
            message:"Access denied, Admin access is required!"
        })
    }
    next()
}

module.exports = isAdminUser;