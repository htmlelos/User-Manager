const { Router} = require('express');
const router = Router()
const user = require('../controllers/user-controller')

router.route('/users')
        .get(user.getAllUsers)
        .post(user.createUser)

module.exports = router;