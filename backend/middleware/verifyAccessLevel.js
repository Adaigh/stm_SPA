const verifyAccessLevel = async (req,res,next) => {
    if(!req.user){
        return res.status(401).json({error: "No User Info"})
    }

    if(req.user.access < 3) {
        return res.status(401).json({error: "Access denied"})
    }

    next()
}

module.exports = verifyAccessLevel