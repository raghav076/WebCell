const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')


const auth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Invalid token')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId, name:payload.name, type:payload.type}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid token')
    }
}

module.exports = auth