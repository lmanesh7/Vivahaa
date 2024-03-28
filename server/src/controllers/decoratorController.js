import decorator from '../model/Decorator.js'

// Create a new decorator
export const createdecorator = async (req, res) => {
  try {
    const createdBy = req.UserInfo.id // Assuming user ID is stored in req.userInfo
    const { businessName, address, serviceDescription, image, email, phone, services, price, workImages } = req.body;
    //const parsedServices = JSON.parse(services);

    const decorators = await decorator.create({businessName,
    address,
    serviceDescription,
    image, 
    email, 
    phone, 
    services,
    price,
    workImages,
    createdBy
  })
    res.status(201).json(decorators)
  } catch (error) {
    console.error('Error creating decorator:', error)
    res.status(500).json({ error: 'Failed to create decorator' })
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

// Get all decorators
export const getAlldecorators = async (req, res) => {
  try {
    const decorators = await decorator.find()
    res.json(decorators)
  } catch (error) {
    console.error('Error fetching decorators:', error)
    res.status(500).json({ error: 'Failed to fetch decorators' })
  }
}

// Get decorator by ID
export const getdecoratorById = async (req, res) => {
  try {
    const decorators = await decorator.findById(req.params.id)
    if (!decorators) {
      return res.status(404).json({ message: 'decorator not found' })
    }
    res.json(decorators)

  } catch (error) {
    console.error('Error fetching decorator by ID:', error)
    res.status(500).json({ error: 'Failed to fetch decorator' })
  }
}

export const getdecoratorsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId
    const decorators = await decorator.find({ createdBy: userId })

    // if (!decorators || decorators.length === 0) {
    //   return res.status(204).json({ message: 'No decorators found for this user' })
    // }

    res.json(decorators)
  } catch (error) {
    console.error('Error fetching decorators by userId:', error)
    res.status(500).json({ error: 'Failed to fetch decorators by userId' })
  }
}

// Update decorator by ID
export const updatedecoratorById = async (req, res) => {
  try {
    const userId = req.UserInfo.id // Assuming user ID is stored in req.userInfo
    const decoratorData = {...req.body}
    console.log(decoratorData)
    const decorator_ = await decorator.findById(decoratorData._id)

    if (!decorator_) {
      return res.status(404).json({ message: 'decorator not found' })
    }
    if (decorator_.createdBy != userId) {
      return res.status(403).json({ message: 'Unauthorized to update decorator' })
    }
    const updateddecorator = await decorator.findByIdAndUpdate(decoratorData._id, decoratorData, { new: true })
    res.json(updateddecorator)
  } catch (error) {
    console.error('Error updating decorator by ID:', error)
    res.status(500).json({ error: 'Failed to update decorator' })
  }
}

// Delete decorator by ID
export const deletedecoratorById = async (req, res) => {
  try {
    const userId = req.UserInfo.id // Assuming user ID is stored in req.userInfo
    const decoratorId = req.params.id
    const decorator_ = await decorator.findById(decoratorId)
    if (!decorator_) {
      return res.status(404).json({ message: 'decorator not found' })
    }
    if (decorator_.createdBy != userId) {
      return res.status(403).json({ message: 'Unauthorized to delete decorator' })
    }
    await decorator.findByIdAndDelete(decoratorId)
    res.json({ message: 'decorator deleted successfully' })
  } catch (error) {
    console.error('Error deleting decorator by ID:', error)
    res.status(500).json({ error: 'Failed to delete decorator' })
  }
}
