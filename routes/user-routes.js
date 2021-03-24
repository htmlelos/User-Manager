const { Router} = require('express');
const router = Router()
const user = require('../controllers/user-controller')
const {verifyToken, isParent} = require('../middleware/authwt')

router.route('/users')
        .get(verifyToken, user.getAllUsers)
        .post(verifyToken, user.createUser)
router.route('/users/:userId')
        .get(verifyToken, user.getUser)
        .put(verifyToken, user.updateUser)
router.route('/users/:userId/childs/:childId')
        .put([verifyToken, isParent], user.updateChildUser)
router.route('/users/:userId/childs')
        .get([verifyToken, isParent], user.getChildsUser)
        .post([verifyToken, isParent], user.addChildUser)
module.exports = router;