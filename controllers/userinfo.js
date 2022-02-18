const User = require('../models/user');
const { StatusCodes } = require('http-status-codes')
const { UnauthenticatedError } = require('../errors')

const getAdmins = async (req, res) => {
    if(req.user.type != 'dev') {
        throw new UnauthenticatedError("Only developers can get admins");
    }
  const admins = await User.find({ type: 'admin' }).select('name links')
  res.status(StatusCodes.OK).json({ admins, count: admins.length })
}

const getDevs = async (req, res) => {
    if(req.user.type == 'user') {
        throw new UnauthenticatedError("Only developers can get admins");
    }
  const devs = await User.find({ type: 'dev' }).select('name links')
  res.status(StatusCodes.OK).json({ devs, count: devs.length })
}

module.exports = {
  getAdmins,
  getDevs
}
