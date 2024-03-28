import express from 'express'
import { createVenue, getAllVenues, getVenueById, updateVenueById, deleteVenueById, getVenuesByUserId, uploadImage } from '../../controllers/venueController.js'
import verifyJWT from '../../middleware/verifyJWT.js'
import multer from 'multer'

const router = express.Router()

router.get('/all', getAllVenues) // Get all venues

const storage = multer.diskStorage({
    destination: './uploads/',
  });

  
const upload = multer({ storage });

router.use(verifyJWT)

// Routes for venues
router.post('/', createVenue) // Create a new venue
router.get('/:id', getVenueById) // Get venue by ID
router.put('/:id', updateVenueById) // Update venue by ID
router.delete('/:id', deleteVenueById) // Delete venue by ID

router.get('/user/:userId', getVenuesByUserId);
router.post('/api/upload',upload.single('image'), uploadImage);

export default router
