import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/axios';
import {
  TextField,
  Typography,
  Box,
  Container,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Input,
  TextareaAutosize,
  Grid,
  IconButton,
} from "@mui/material";
import { useForm } from 'react-hook-form';
import decoratorsService from '../../../services/Decorators';
import { axiosPrivate } from '../../../api/axios';
import { useSnackbar } from 'notistack';
import LoginUserContext from '../../../context/LoginUserProvider';
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const EditDecorator = () => {
  const { id } = useParams(); // Get the decorator ID from the URL params
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [decorator, setDecorator] = useState(null);
  const { setDecorators } = useContext(LoginUserContext);
  const [previousWorkImages, setPreviousWorkImages] = useState([]);

  // Fetch decorator data on component mount
  useEffect(() => {
    
    const fetchDecorator = async () => {  
      try {
        debugger 
        const fetchedDecorator = await axios.get(`api/decorators/${id}`);//decoratorsService.getdecoratorsById(axiosPrivate, id);
        setDecorator(fetchedDecorator.data);
        setPreviousWorkImages(JSON.parse(fetchedDecorator.data.workImages))
      } catch (error) {
        console.error('Error fetching decorator:', error);
      }
    };
    fetchDecorator();
  }, [axiosPrivate, id]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("_id", id);
      formData.append('businessName', data.businessName);
      formData.append('address', data.address);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('services', JSON.stringify(data.services)); // Convert services array to JSON string
      formData.append("image", data.image ? data.image[0]?.name? data.image[0].name: decorator.image : decorator.image); // Assuming single image upload
      var arr = [];
      for (var i = 0; i < previousWorkImages.length; i++) {
        arr[i] = previousWorkImages[i].name
          ? previousWorkImages[i].name
          : previousWorkImages[i];
      }
      formData.append("workImages", JSON.stringify(arr));
      // Send updated decorator data to the backend
      await decoratorsService.updatedecorator(axiosPrivate, id, formData);
      
      enqueueSnackbar('Decorator updated successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });

      // Optionally, you can update the decorators state here

    } catch (error) {
      console.error('Error updating decorator:', error);
      enqueueSnackbar('Error while updating a Decorator', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
    }
  };
  const handleImageUpload = async (event) => {
    debugger;
    const files = Array.from(event.target.files);
    var j = 0;
    for(var i = previousWorkImages.length; j < files.length; i++, j++){
      previousWorkImages[i] = files[j];  
    } 
    //setPreviousWorkImages([...previousWorkImages, ...files.name]);
    setPreviousWorkImages(previousWorkImages)

    console.log(files);
    // if(previousWorkImages){
    // await axios.post('http://localhost:3500/api/upload',files)
    // }
  };
  const removeImage = (index) => {
    const updatedImages = [...previousWorkImages];
    console.log("before remove:", updatedImages);
    updatedImages.splice(index, 1);
    console.log("After remove:", updatedImages);
    setPreviousWorkImages(updatedImages);
  
  };
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  debugger;
  if (!decorator) {
    return (
      <Container>
        <Typography variant="h3">Loading...</Typography>
       {timeout(3000) && <Typography variant="h2">Almost there...</Typography>}
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Edit Decorator</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Business Name"
            {...register('businessName')}
            defaultValue={decorator.businessName}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Address"
            {...register('address')}
            defaultValue={decorator.address}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Contact Email"
            type="email"
            {...register('email')}
            defaultValue={decorator.email}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Contact Phone"
            type="tel"
            {...register('phone')}
            defaultValue={decorator.phone}
          />
        </Box>
        {/* <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Services Offered</Typography>
          {decorator.services.map((service, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                fullWidth
                {...register(`services.${index}.name`)}
                defaultValue={service.name}
                label="Service Name"
                sx={{ mr: 1 }}
              />
              <TextField
                fullWidth
                {...register(`services.${index}.price`)}
                defaultValue={service.price}
                label="Price"
              />
            </Box>
          ))}
        </Box> */}
           <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="services"
            type="text"
            {...register('services')}
            defaultValue={decorator.services}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Price"
            {...register('price')}
            defaultValue={decorator.price}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <InputLabel htmlFor="decorator-image">Decorator Image</InputLabel>
          <Input
            id="decorator-image"
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
          {decorator.image && (
            <Typography variant="body1">
              Existing Image: {decorator.image}
            </Typography>
          )}
        </Box>
        <br></br>
        <label>Upload images of your work</label>
        <Grid container spacing={2}>
          {previousWorkImages.map((image, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box sx={{ position: "relative" }}>
                <img
                  src={
                    image.name
                      ? URL.createObjectURL(image)
                      : `http://localhost:3500/uploads/images/${image}`
                  }
                  alt={`Previous Work ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
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
                style={{ display: "none" }}
              />
              <IconButton component="span" color="primary">
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditDecorator;
