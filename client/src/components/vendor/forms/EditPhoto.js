import React, { useState, useEffect } from "react";
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
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "../../../api/axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const EditPhoto = () => {
  const { id } = useParams(); // Get the photo ID from the URL params
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [photo, setPhoto] = useState(null);
  const [previousWorkImages, setPreviousWorkImages] = useState([]);
  const [isNew, setIsNew] = useState(false);

  // Fetch photo data on component mount
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        // Fetch photo data by ID from the backend
        const response = await axios.get(`/api/photo/${id}`);
        const fetchedPhoto = response.data;
        console.log(fetchedPhoto);
        setPhoto(fetchedPhoto);
        setPreviousWorkImages(JSON.parse(fetchedPhoto.workImages))
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };
    fetchPhoto();
  }, [id]);

  const handleImageUpload = async (event) => {
    debugger;
    const files = Array.from(event.target.files);
    var j = 0;
    for(var i = previousWorkImages.length; j < files.length; i++, j++){
      previousWorkImages[i] = files[j];  
    } 
    //setPreviousWorkImages([...previousWorkImages, ...files.name]);
    setPreviousWorkImages(previousWorkImages)
    setIsNew(true)
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
    setIsNew(false)
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      // Append photo ID to the form data
      formData.append("_id", id);
      formData.append("vendorLoggedIn",sessionStorage.getItem('loggedInUser'));
      formData.append("businessName", data.businessName);
      formData.append("address", data.address);
      formData.append("albumPrice",data.albumPrice);
      formData.append("PerDay",data.PerDay);
      formData.append("contact",data.contact);
      formData.append("About",data.About);
      formData.append("image", data.image ? data.image[0]?.name? data.image[0].name: photo.image : photo.image);


      // Append other fields to the form data as needed
      // ...

      // Append updated images
      var arr = [];
      for (var i = 0; i < previousWorkImages.length; i++) {
        arr[i] = previousWorkImages[i].name?previousWorkImages[i].name:previousWorkImages[i];
      }

      formData.append("workImages", JSON.stringify(arr));
      for(var key of formData.entries()){
        console.log(key[0]+' '+key[1])
      }
      debugger;
      // Send updated photo data to the backend
      //const response = await axios.put(`/api/photo/${id}`, formData);
      //await axios.post(`/api/photo/${id}`,formData);
      await fetch(`http://localhost:3500/api/photo/${id}`, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        // Handle response
        console.log('Photographer updated successfully!');
           // console.log(response);
           if(response.status===200){
      enqueueSnackbar("Photogrpaher updated successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
    else{
       enqueueSnackbar("Error while updating photographer", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
      })
      .catch(error => {
        // Handle error
        console.error('Photographer updated failed!');
         enqueueSnackbar("Error while updating photographer", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
        return ;
      });

  
    } catch (error) {
      console.error("Error updating photo:", error);
      enqueueSnackbar("Error while updating photographer", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  if (!photo) {
    return (
      <Container>
        <Typography variant="h3">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Edit Photo
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* Display existing photo information */}
      <TextField
        fullWidth
        label="Business Name"
        {...register('businessName')}
        defaultValue={photo.businessName}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Address"
        {...register('address')}
        defaultValue={photo.address}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Price Per Album"
        {...register('albumPrice')}
        defaultValue={photo.albumPrice}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Price Per Day"
        {...register('PerDay')}
        defaultValue={photo.PerDay}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Contact"
        {...register('contact')}
        defaultValue={photo.contact}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="About"
        {...register('About')}
        defaultValue={photo.About}
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        <InputLabel htmlFor="display-image">Display Image</InputLabel>
        <Input
          id="display-image"
          type="file"
          {...register("image")}
          error={!!errors.image}
          inputProps={{
            accept: "image/*", // Accept only image files
          }}
        />
        {errors.image && (
          <Typography variant="caption" color="error">
            {errors.image.message}
          </Typography>
        )}
        {/* Display the selected image name */}
        {photo.image && (
          <Typography variant="body1">Existing Image: {photo.image}</Typography>
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

export default EditPhoto;
