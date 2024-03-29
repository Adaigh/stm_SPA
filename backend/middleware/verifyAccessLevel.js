const verifyAccessLevel = (level) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({error: "No User Info"})
        }
    
        if(req.user.access < level) {
            return res.status(401).json({error: "Access denied"})
        }
    
        next()   
    }
}

module.exports = verifyAccessLevel