const jwt = require('jsonwebtoken')
const UserAccount = require('../models/userAccountModel')

const requireAuth = async (req,res,next) => {

    // Verify authentication
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }

    // Isolate JWT
    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await UserAccount.findOne({_id}).select({_id:1, access:1})
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireAuth