import React, { useContext } from 'react'
import { TextField, Typography, Box, Container, Button, MenuItem, FormControl, InputLabel, Select, Chip, Input, TextareaAutosize, Grid, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router'
import MehendiArtistsService from '../../../services/MehendiArtists'
import LoginUserContext from '../../../context/LoginUserProvider'
import { useState } from 'react'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

const MehendiArtist = () => {
  const axiosPrivate = useAxiosPrivate()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { setMehendiArtists } = useContext(LoginUserContext)
  const [previousWorkImages, setPreviousWorkImages] = useState([])

  // const defaultValues = {
  //   businessName: 'Default Business Name',
  //   address: 'Default Address',
  //   priceQuote: 'Default Price Quote',
  //   description: 'Default Description',
  //   contactInfo: 'Default Contact Info',
  //   seatingCapacity: 'Default Seating Capacity',
  //   cuisinesAvailable: ['Italian', 'Mexican'], // Default selected cuisines
  //   facilitiesAvailable: ['Parking', 'Wi-Fi'], // Default selected facilities
  //   pricePerPlateVeg: 'Default Price Per Plate - Veg',
  //   pricePerPlateNonVeg: 'Default Price Per Plate - Non-Veg',
  // }
  const defaultValues = {
    businessName: `Mehendi Magic ${Math.floor(Math.random() * 10000)}`,
    address: "456 Henna Avenue, Cityville, Country",
    priceQuote: "$100 - $200",
    artistDescription: "I am a passionate Mehendi artist with over 5 years of experience. I specialize in intricate and elegant designs, blending traditional and modern styles to create stunning henna art.",
    workDescription: "My Mehendi designs range from traditional bridal patterns to contemporary designs for special events such as festivals and parties. I use high-quality natural henna paste for long-lasting and vibrant color.",
    contactInfo: "info@mehendimagic.com | +1 (123) 456-7890"
  }

  const { handleSubmit, register, formState: { errors } } = useForm({ defaultValues })

  const placeholderValues = {
    businessName: "Enter your business name",
    address: "Enter your business address",
    priceQuote: "Enter the price quote",
    artistDescription: 'Tell us about yourself and your art',
    workDescription: 'Describe your mehendi designs and services',
    contactInfo: "Enter contact information"
  }
  const handleImageUpload = async (event) => {
    
    const files = Array.from(event.target.files)
    setPreviousWorkImages([...previousWorkImages, ...files])
    console.log(previousWorkImages)
    // if(previousWorkImages){
    // await axios.post('http://localhost:3500/api/upload',files)
    // }
  }
  const removeImage = (index) => {
    const updatedImages = [...previousWorkImages]
    updatedImages.splice(index, 1)
    setPreviousWorkImages(updatedImages)
  }
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
        //console.log("img data:", data.image[0].name)  
        formData.append('image', data.image[0].name); // Assuming single image upload
    
        // Add other form data
        formData.append('businessName', data.businessName);
        formData.append('address', data.address);
        formData.append('priceQuote', data.priceQuote);
        formData.append('contactInfo', data.contactInfo);
        formData.append('workDescription', data.workDescription);
        formData.append('artistDescription', data.artistDescription);
        var arr = [];
        for(var i=0;i<previousWorkImages.length;i++){
          arr[i] = previousWorkImages[i].name;
        }
        formData.append('workImages', JSON.stringify(arr));
        const formData_ = new FormData();
        formData_.append('image', data.image[0]);
                //const response = await VenuesService.uploadVenueImage( axiosPrivate, data.image[0]);
                console.log(data.image[0])
                fetch('http://localhost:3500/upload', {
                  method: 'POST',
                  body: formData_,
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                })
                .then(response => {
                  // Handle response
                  console.log('Image uploaded successfully!');
                })
                .catch(error => {
                  // Handle error
                  console.error('Image upload failed!');
                  return ;
                });
        
      const mehendiArtistInfo = await MehendiArtistsService.createMehendiArtist(axiosPrivate, formData)
      setMehendiArtists(prevArtists => {
        return [
          mehendiArtistInfo,
          ...(prevArtists.filter(m => m._id !== mehendiArtistInfo._id))
        ]
      })

      enqueueSnackbar('Mehendi Artist created successfully', {
        variant: 'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
      navigate('/vendor-dashboard', { replace: true })
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Error while creating a Mehendi Artist', {
        variant: 'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    }
  }

  return (
    <Container component="main" maxWidth="xl">
      <Typography variant="h3" align="center" sx={{ mb: 2 }}>Mehendi Artist Profile Creation</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Business Name"
          {...register('businessName', { required: 'Business Name is required' })}
          error={!!errors.businessName}
          helperText={errors.businessName && errors.businessName.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.businessName}
        />
        <TextField
          fullWidth
          label="Address"
          {...register('address', { required: 'Address is required' })}
          error={!!errors.address}
          helperText={errors.address && errors.address.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.address}
        />
        <TextField
          fullWidth
          label="Price Quote"
          {...register('priceQuote', { required: 'Price Quote is required' })}
          error={!!errors.priceQuote}
          helperText={errors.priceQuote && errors.priceQuote.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.priceQuote}
        />
        <TextField
          fullWidth
          label="About the Artist"
          {...register('artistDescription', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description && errors.description.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.description}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Description of Work"
          {...register('workDescription', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description && errors.description.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.description}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Contact Info"
          {...register('contactInfo', { required: 'Contact Info is required' })}
          error={!!errors.contactInfo}
          helperText={errors.contactInfo && errors.contactInfo.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.contactInfo}
        />
        <Box sx={{ mb: 2 }}>
  <InputLabel htmlFor="mehindi-artist-image">Venue Image</InputLabel>
  <Input
    id="mehindi-artist-image"
    
    type="file"
    {...register('image')}
    error={!!errors.image}
    inputProps={{
      accept: 'image/*', // Accept only image files
    }}
  />
  {errors.image && (
    <Typography variant="caption" color="error">
      {errors.image.message}
    </Typography>
  )}
  {/* Display the selected image name */}

</Box>
<br></br>
  <label>Upload images of your work</label>
  <Grid container spacing={2}>
          {previousWorkImages.map((image, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box sx={{ position: 'relative' }}>
                <img src={URL.createObjectURL(image)} alt={`Previous Work ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                  onClick={() => removeImage(index)}
                >
                  x
                </IconButton>
              </Box>
            </Grid>
          ))}
          <Grid item xs={6} sm={4} md={3}>
            <label htmlFor="image-upload">
              <Input
                accept="image/*"
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <IconButton component="span" color="primary">
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default MehendiArtist
