const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const { UnauthenticatedError } = require('../errors');

const register = async(req, res) => {
    // const {name, email, password}= req.body;
    // if(!name || !email || !password) {
    //     throw new BadRequestError('Name, email and password is required');
    // }
    // const tempUser = {name, email, password}
    const user = await User.create({...req.body})
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).send({user:{name:user.name, type:user.type}, token});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError('Email and password is required');
    }

    const user = await User.findOne({email})

    if(!user) {
        throw new UnauthenticatedError('Invalid email or password');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid email or password');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name, type:user.type}, token});
}

const securityLogin = async(req, res) => {
    const {name, security_question, security_answer} = req.body;
    if(!name || !security_question || !security_answer) {
        throw new BadRequestError('Username, Security Question and Answer');
    }
    const user = await User.findOne({name})

    if(!user) {
        throw new UnauthenticatedError('User does not exist');
    }

    const securityPassed = await user.securityCheck(security_question, security_answer);

    if(!securityPassed) {
        throw new UnauthenticatedError('Security Question or Answer did not match');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:user.name, type:user.type}, token});
}

module.exports = {
    register,
    login,
    securityLogin
}