import React, { useContext, useState } from 'react';
import { TextField, Typography, Box, Container, Button, MenuItem, FormControl, InputLabel, Select, Chip, Input, TextareaAutosize, Grid, IconButton } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import LoginUserContext from '../../../context/LoginUserProvider';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import decoratorsService from '../../../services/Decorators';
import { axiosPrivate } from '../../../api/axios';

const Decorators = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setDecorators } = useContext(LoginUserContext);

  const { handleSubmit, register, formState: { errors } } = useForm();
  const [services, setServices] = useState([{ name: '', price: '' }]);
  const [previousWorkImages, setPreviousWorkImages] = useState([])
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('businessName', data.businessName);
      formData.append('address', data.address);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('price',data.price);
      formData.append('services', data.services); 
      formData.append('serviceDescription',data.serviceDescription);// Convert services to JSON string
      formData.append('image',data.image[0].name)
      var arr = [];
      for(var i=0;i<previousWorkImages.length;i++){
        arr[i] = previousWorkImages[i].name;
      }
      debugger;
      formData.append('workImages', JSON.stringify(arr));
      // Example: Axios call to submit decorator data
      const response = await decoratorsService.createdecorator(axiosPrivate, formData);
    

      enqueueSnackbar('Decorator created successfully', { variant: 'success' });
      navigate('/dashboard', { replace: true }); // Redirect to dashboard after submission
    } catch (error) {
      console.error('Error creating decorator:', error);
      enqueueSnackbar('Error while creating decorator', { variant: 'error' });
    }
  };

  const handleServiceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedServices = [...services];
    updatedServices[index][name] = value;
    setServices(updatedServices);
  };

  const handleAddService = () => {
    setServices([...services, { name: '', price: '' }]);
  };

  const handleRemoveService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };
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

  return (
    <Container component="main" maxWidth="xl">
      <Typography variant="h3" align="center" sx={{ mb: 2 }}>Decorator Profile Creation</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Business Name"
          {...register('businessName', { required: 'Business Name is required' })}
          error={!!errors.businessName}
          helperText={errors.businessName && errors.businessName.message}
          sx={{ mb: 2 }}
          placeholder="Enter company name"
        />
                <TextField
          fullWidth
          label="Address"
          {...register('address', { required: 'Address is required' })}
          error={!!errors.address}
          helperText={errors.address && errors.address.message}
          sx={{ mb: 2 }}
          placeholder="Enter address"
        />
        <TextField
          fullWidth
          label="Contact Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          sx={{ mb: 2 }}
          placeholder="Enter contact email"
        />
        <TextField
          fullWidth
          label="Contact Phone"
          type="tel"
          {...register('phone', { required: 'Phone number is required' })}
          error={!!errors.phone}
          helperText={errors.phone && errors.phone.message}
          sx={{ mb: 2 }}
          placeholder="Enter contact phone"
        />  
        {/*comment for future update */}
        {/* <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Services Offered</Typography>
          {services.map((service, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                fullWidth
                name="name"
                value={service.name}
                onChange={(e) => handleServiceChange(index, e)}
                label="Service Name"
                placeholder="Enter service name"
                sx={{ mr: 1 }}
              />
              <TextField
                fullWidth
                name="price"
                value={service.price}
                onChange={(e) => handleServiceChange(index, e)}
                label="Price"
                placeholder="Enter price"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              {index > 0 && (
                <Button variant="contained" color="secondary" onClick={() => handleRemoveService(index)}>Remove</Button>
              )}
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={handleAddService}>Add Service</Button>
          
        </FormControl> */}
              <TextField
          fullWidth
          label="services"
          type="text"
          {...register('services', { required: 'Service  is required' })}
          error={!!errors.services}
          helperText={errors.services && errors.services.message}
          sx={{ mb: 2 }}
          placeholder="Enter service you want to provide"
        />  
              <TextField
          fullWidth
          label="price"
          {...register('price', { required: 'Price  value is required' })}
          error={!!errors.price}
          helperText={errors.price && errors.price.message}
          sx={{ mb: 2 }}
          placeholder="Enter price for your service"
        />  
        <TextField
            fullWidth
            label="Description of the Service"
            {...register('serviceDescription', { required: 'Description is required' })}
            error={!!errors.description}
            helperText={errors.description && errors.description.message}
            sx={{ mb: 2 }}
            placeholder={"Description of the Service"}
            multiline
            rows={4}
          />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label htmlFor="decorator-image">Decorator Image</label>
    <Input
      id="decorator-image"
      type="file"
      {...register('image', { required: 'Decorator Image is required' })}
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
  </FormControl>
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
  );
};

export default Decorators;
