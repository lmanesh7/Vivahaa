import Photo from '../model/Photo.js';

//creating a new photographer profile.
export const createPhoto = async (req, res) => {
  try {
    const createdBy = req.UserInfo.id; // Assuming user ID is stored in req.UserInfo
    const photoData = { ...req.body, createdBy };
    console.log(photoData)
    const photo = await Photo.create(photoData);
    res.status(201).json(photo);
  } catch (error) {
    console.error('Error creating Photographer:', error);
    res.status(500).json({ error: 'Failed to create Photographer' });
  }
  //Getting Photographers data
}
export const getPhotographerByUserId = async (req, res) => {
  try {
    const userId = req.params.userId
    const photos = await Photo.find({ createdBy: userId })
    console.log("Reached getting photo");
  
      // if (!venues || venues.length === 0) {
      //   return res.status(204).json({ message: 'No venues found for this user' })
      // }
  
    res.json(photos)
  } catch (error) {
    console.error('Error fetching venues by userId:', error)
    res.status(500).json({ error: 'Failed to fetch photographers by userId' })
  }
}

export const getAllPhotographers = async (req, res) => {
  try{
    const Photographers = await Photo.find()  
    res.json(Photographers)
  }
  catch(error)
  {res.status(500).json({error:'Failed to fetch photographers'})

  }
}

export const deletePhotographerById = async(req, res) => {
  try{
    const id = req.params.id;
    const photographer = await Photo.findById(id);
    if(!photographer){
      return res.status(404).json({message:"No photographer found"})
    }
    if(photographer.createdBy!=req.UserInfo.id){
      return res.status(403).json({message:"Unauthorized to delete"})
    }
    await Photo.deleteOne({_id:id});
    return res.status(200).json({message:"Photographer deleted successfully"})

  }
  catch(error){
    return res.status(500).json({message:error})

  }
}