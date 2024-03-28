import express from 'express'
import { createPhoto, deletePhotographerById, getAllPhotographers, getPhotographerByUserId} from '../../controllers/photoController.js'
import verifyJWT from '../../middleware/verifyJWT.js'

const router = express.Router()
router.use(verifyJWT)
// Routes for photo
router.post('/', createPhoto) // Create a new photo
router.get('/user/:userId', getPhotographerByUserId);
router.get('/all', getAllPhotographers);
router.delete('/delete/:id', deletePhotographerById);

export default router
