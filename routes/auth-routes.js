const { Router } = require('express')
const router = Router()

const auth = require('../controllers/auth-controller')

router.route('/signup')
        .post(auth.signup)
router.route('/signin')
        .post(auth.signin)

module.exports = router     