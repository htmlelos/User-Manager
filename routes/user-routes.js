const { Router} = require('express');
const router = Router()
const user = require('../controllers/user')

router.route('/users')
        .get(user.getAllUsers)
        .post(user.createUser)

module.exports = router;