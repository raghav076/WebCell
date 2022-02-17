const {register, login, securityLogin} = require('../controllers/auth')
const router = require('express').Router()

router.route('/').get((req, res) => {
    res.send('Auth page')
})
router.route('/login').post(login);
router.route('/register').post(register);
router.route('/security_login').post(securityLogin);

module.exports = router