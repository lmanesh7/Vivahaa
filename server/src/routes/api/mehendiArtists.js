import express from 'express'
import { createMehendiArtist, getAllMehendiArtists, getMehendiArtistById, updateMehendiArtistById, deleteMehendiArtistById, getMehendiArtistsByUserId } from '../../controllers/mehendiArtistsController.js'
import verifyJWT from '../../middleware/verifyJWT.js'

const router = express.Router()

router.get('/all', getAllMehendiArtists) // Get all mehendi artists

router.use(verifyJWT)

// Routes for mehendi artists
router.post('/', createMehendiArtist) // Create a new mehendi artist
router.get('/:id', getMehendiArtistById) // Get mehendi artist by ID
router.put('/:id', updateMehendiArtistById) // Update mehendi artist by ID
router.delete('/:id', deleteMehendiArtistById) // Delete mehendi artist by ID

router.get('/user/:userId', getMehendiArtistsByUserId)

export default router
