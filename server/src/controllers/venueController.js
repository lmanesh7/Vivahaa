import Venue from '../model/Venues.js'

// Create a new venue
export const createVenue = async (req, res) => {
  try {
    const createdBy = req.UserInfo.id // Assuming user ID is stored in req.userInfo
    const venueData = { ...req.body, createdBy }
    console.log(venueData)
    const venue = await Venue.create(venueData)
    res.status(201).json(venue)
  } catch (error) {
    console.error('Error creating venue:', error)
    res.status(500).json({ error: 'Failed to create venue' })
  }
}

export const uploadImage = async (req, res) => {


  const image = await db.collection('images').insertOne({
    filename: req.file.filename,
    contentType: req.file.mimetype,
    data: req.file.buffer,
  });

  res.status(200).json({ message: 'Image uploaded successfully!' });
};

// Get all venues
export const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find()
    res.json(venues)
  } catch (error) {
    console.error('Error fetching venues:', error)
    res.status(500).json({ error: 'Failed to fetch venues' })
  }
}

// Get venue by ID
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id)
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' })
    }
    res.json(venue)
  } catch (error) {
    console.error('Error fetching venue by ID:', error)
    res.status(500).json({ error: 'Failed to fetch venue' })
  }
}

export const getVenuesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId
    const venues = await Venue.find({ createdBy: userId })

    // if (!venues || venues.length === 0) {
    //   return res.status(204).json({ message: 'No venues found for this user' })
    // }

    res.json(venues)
  } catch (error) {
    console.error('Error fetching venues by userId:', error)
    res.status(500).json({ error: 'Failed to fetch venues by userId' })
  }
}

// Update venue by ID
export const updateVenueById = async (req, res) => {
  try {
    const userId = req.UserInfo.id // Assuming user ID is stored in req.userInfo
    const venueData = {...req.body}
    console.log(venueData)
    const venue = await Venue.findById(venueData._id)

    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' })
    }
    if (venue.createdBy != userId) {
      return res.status(403).json({ message: 'Unauthorized to update venue' })
    }
    const updatedVenue = await Venue.findByIdAndUpdate(venueData._id, venueData, { new: true })
    res.json(updatedVenue)
  } catch (error) {
    console.error('Error updating venue by ID:', error)
    res.status(500).json({ error: 'Failed to update venue' })
  }
}

// Delete venue by ID
export const deleteVenueById = async (req, res) => {
  try {
    const userId = req.UserInfo.id // Assuming user ID is stored in req.userInfo
    const venueId = req.params.id
    const venue = await Venue.findById(venueId)
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' })
    }
    if (venue.createdBy != userId) {
      return res.status(403).json({ message: 'Unauthorized to delete venue' })
    }
    await Venue.findByIdAndDelete(venueId)
    res.json({ message: 'Venue deleted successfully' })
  } catch (error) {
    console.error('Error deleting venue by ID:', error)
    res.status(500).json({ error: 'Failed to delete venue' })
  }
}
