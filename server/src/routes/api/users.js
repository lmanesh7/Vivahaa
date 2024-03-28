import express from 'express'
import multer from 'multer'

import verifyJWT from '../../middleware/verifyJWT.js'
import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../../controllers/usersController.js'

const router = express.Router()
const upload = multer()

router.use(verifyJWT)

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.patch('/:id', upload.single('profilePicture'), updateUserById)
router.delete('/:id', deleteUserById)

export default router
