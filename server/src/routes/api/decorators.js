import express from 'express'
import { createdecorator, getAlldecorators, getdecoratorById, updatedecoratorById, deletedecoratorById, getdecoratorsByUserId, uploadImage } from '../../controllers/decoratorController.js'
import verifyJWT from '../../middleware/verifyJWT.js'
import multer from 'multer'

const router = express.Router()

router.get('/all', getAlldecorators) // Get all decorators

const storage = multer.diskStorage({
    destination: './uploads/',
  });

  
const upload = multer({ storage });

router.use(verifyJWT)

// Routes for decorators
router.post('/', createdecorator) // Create a new decorator
router.get('/:id', getdecoratorById) // Get decorator by ID
router.put('/:id', updatedecoratorById) // Update decorator by ID
router.delete('/:id', deletedecoratorById) // Delete decorator by ID

router.get('/user/:userId', getdecoratorsByUserId);
router.post('/api/upload',upload.single('image'), uploadImage);

export default router
