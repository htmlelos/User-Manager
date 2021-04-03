import express from 'express'
const router = express.Router()
import {signup, signin} from '../controllers/auth-controller.js'

router.route('/signup')
        .post(signup)
router.route('/signin')
        .post(signin)

export default router