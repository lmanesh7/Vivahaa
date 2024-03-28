import React, { useContext, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import LoginUserContext from "../../../context/LoginUserProvider";
import PhotoService from "../../../services/Photos";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "../../../api/axios";

const Photo = () => {
  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setPhotos } = useContext(LoginUserContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();
  const [previousWorkImages, setPreviousWorkImages] = useState([]);
  const placeholderValues = {
    businessName: "Enter your business name",
    address: "Enter your business address",
    albumPrice: "Enter the price per Album",
    PerDay: "Enter the price per Day",
    contact: "Enter  your contact info",
    About: "Write about your Bussiness",
  };
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    setPreviousWorkImages([...previousWorkImages, ...files]);
    console.log(previousWorkImages);
    // if(previousWorkImages){
    // await axios.post('http://localhost:3500/api/upload',files)
    // }
  };

  const removeImage = (index) => {
    const updatedImages = [...previousWorkImages];
    updatedImages.splice(index, 1);
    setPreviousWorkImages(updatedImages);
  };
  const onSubmit = async (data) => {
    try {
      debugger;
      const formData = new FormData();
      formData.append("businessName", data.businessName);
      formData.append("address", data.address);
      formData.append("About", data.About);
      formData.append("contact", data.contact);
      formData.append("albumPrice", data.albumPrice);
      formData.append("PerDay", data.PerDay);
      //formData.append('workImages', data.albumPrice);
      formData.append("image", data.image[0].name);
      var arr = [];
      for (var i = 0; i < previousWorkImages.length; i++) {
        arr[i] = previousWorkImages[i].name;
      }

      formData.append("workImages", JSON.stringify(arr));
      const photoInfo = await PhotoService.createPhoto(axiosPrivate, formData);

    //  // setPhotos((prevPhoto) => {
    //     return [photoInfo, ...prevPhoto.filter((m) => m._id !== photoInfo._id)];
    //   });
      enqueueSnackbar("Your profile created successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      console.log(data);
      navigate("/vendor-dashboard", { replace: true });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error while creating a Photograher profile.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Typography variant="h3" align="center" sx={{ mb: 2 }}>
        Photograher Profile Creation
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Business Name"
          {...register("businessName", {
            required: "Business Name is required",
          })}
          error={!!errors.businessName}
          helperText={errors.businessName && errors.businessName.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.businessName}
        />
        <TextField
          fullWidth
          label="Address"
          {...register("address", { required: "Address is required" })}
          error={!!errors.address}
          helperText={errors.address && errors.address.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.address}
        />
        <TextField
          fullWidth
          label="Price Per Album"
          {...register("albumPrice", { required: "Price Quote is required" })}
          error={!!errors.albumPrice}
          helperText={errors.albumPrice && errors.albumPrice.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.albumPrice}
        />
        <TextField
          fullWidth
          label="Price Per Day"
          {...register("PerDay", { required: "Price per Day is required" })}
          error={!!errors.PerDay}
          helperText={errors.PerDay && errors.PerDay.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.PerDay}
        />
        <TextField
          fullWidth
          label="Contact"
          {...register("contact", { required: "Contact is required" })}
          error={!!errors.contact}
          helperText={errors.contact && errors.contact.message}
          sx={{ mb: 2 }}
          placeholder={placeholderValues.contact}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Write About Your Business"
            multiline
            rows={4}
            {...register("About", { required: "Info is required" })}
            error={!!errors.About}
            helperText={errors.About && errors.About.message}
            placeholder={placeholderValues.About}
            InputProps={{
              style: {
                resize: "vertical",
                overflow: "auto",
              },
            }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <label htmlFor="display-image">Display Image</label>
            <Input
              id="photographer-image"
              type="file"
              {...register("image", { required: "Display Image is required" })}
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
          </FormControl>
        </FormControl>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Previous Work
        </Typography>
        <Grid container spacing={2}>
          {previousWorkImages.map((image, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box sx={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(image)}
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
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};
export default Photo;
