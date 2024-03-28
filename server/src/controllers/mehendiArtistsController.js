import MehendiArtists from '../model/MehendiArtists.js'

// Create a new mehendi artist profile
export const createMehendiArtist = async (req, res) => {
  try {
    const createdBy = req.UserInfo.id // Assuming user ID is stored in req.userInfo
    const mehendiArtistData = { ...req.body, createdBy }
    const mehendiArtist = await MehendiArtists.create(mehendiArtistData)
    res.status(201).json(mehendiArtist)
  } catch (error) {
    console.error('Error creating mehendi artist:', error)
    res.status(500).json({ error: 'Failed to create mehendi artist' })
  }
}

// Get all mehendi artists
export const getAllMehendiArtists = async (req, res) => {
  try {
    const mehendiArtists = await MehendiArtists.find()
    res.json(mehendiArtists)  
  } catch (error) {
    console.error('Error fetching mehendi artists:', error)
    res.status(500).json({ error: 'Failed to fetch mehendi artists' })
  }
}

// Get mehendi artist by ID
export const getMehendiArtistById = async (req, res) => {
  try {
    const mehendiArtist = await MehendiArtists.findById(req.params.id)
    console.log(mehendiArtist)
    if (!mehendiArtist) {
      return res.status(404).json({ message: 'Mehendi artist not found' })
    }
    res.json(mehendiArtist)
  } catch (error) {
    console.error('Error fetching mehendi artist by ID:', error)
    res.status(500).json({ error: 'Failed to fetch mehendi artist' })
  }
}

// Get mehendi artists by user ID
export const getMehendiArtistsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId
    const mehendiArtists = await MehendiArtists.find({ createdBy: userId })

    // if (!mehendiArtists || mehendiArtists.length === 0) {
    //   return res.status(204).json({ message: 'No mehendi artists found for this user' })
    // }

    res.json(mehendiArtists)
  } catch (error) {
    console.error('Error fetching mehendi artists by userId:', error)
    res.status(500).json({ error: 'Failed to fetch mehendi artists by userId' })
  }
}


// Update mehendi artist by ID
export const updateMehendiArtistById = async (req, res) => {
  try {
    const userId = req.UserInfo.id // Assuming user ID is stored in req.userInfo
    console.log(req)
    const mehendiArtistData = {...req.body}
    const mehendiArtistId = mehendiArtistData._id
    const mehendiArtist = await MehendiArtists.findById(mehendiArtistId)
    if (!mehendiArtist) {
      return res.status(404).json({ message: 'Mehendi artist not found' })
    }
    // if (mehendiArtist.createdBy !== userId) {
    //   return res.status(403).json({ message: 'Unauthorized to update mehendi artist' })
    // }
    const updatedMehendiArtist = await MehendiArtists.findByIdAndUpdate(mehendiArtistId, mehendiArtistData, { new: true })
    res.json(updatedMehendiArtist)
  } catch (error) {
    console.error('Error updating mehendi artist by ID:', error)
    res.status(500).json({ error: 'Failed to update mehendi artist' })
  }
}

// Delete mehendi artist by ID
export const deleteMehendiArtistById = async (req, res) => {
  try {
    const userId = req.UserInfo.id // Assuming user ID is stored in req.userInfo
    const mehendiArtistId = req.params.id
    const mehendiArtist = await MehendiArtists.findById(mehendiArtistId)
    if (!mehendiArtist) {
      return res.status(404).json({ message: 'Mehendi artist not found' })
    }
    if (mehendiArtist.createdBy != userId) {
      return res.status(403).json({ message: 'Unauthorized to delete mehendi artist' })
    }
    await MehendiArtists.findByIdAndDelete(mehendiArtistId)
    res.json({ message: 'Mehendi artist deleted successfully' })
  } catch (error) {
    console.error('Error deleting mehendi artist by ID:', error)
    res.status(500).json({ error: 'Failed to delete mehendi artist' })
  }
}
