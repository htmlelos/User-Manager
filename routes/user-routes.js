import express from 'express'
const router = express.Router()
import {getAllUsers, createUser, getUser, updateUser, updateChildUser, getChildsUser, addChildUser} from '../controllers/user-controller.js'
import { verifyToken, isParent, isAdmin } from '../middleware/auth-jwt.js'

router.route('/users')
        .get([verifyToken, isAdmin], getAllUsers)
        .post(verifyToken, createUser)
router.route('/users/:userId')
        .get(verifyToken, getUser)
        .put(verifyToken, updateUser)
router.route('/users/:userId/childs/:childId')
        .put([verifyToken, isParent], updateChildUser)
router.route('/users/:userId/childs')
        .get([verifyToken, isParent], getChildsUser)
        .post([verifyToken, isParent], addChildUser)

export default router;