const {
    getAdmins,
    getDevs
  } = require('../controllers/userinfo');

const router = require('express').Router()

router.route('/getDevs').get(getDevs);
router.route('/getAdmins').get(getAdmins);

module.exports = router