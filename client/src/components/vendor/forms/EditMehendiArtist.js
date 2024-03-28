import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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
import { useForm } from "react-hook-form";
import MehendiArtistsService from "../../../services/MehendiArtists";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useSnackbar } from "notistack";
import LoginUserContext from "../../../context/LoginUserProvider";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const EditMehendiArtist = () => {
  const { id } = useParams(); // Get the artist ID from the URL params
  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [artist, setArtist] = useState(null);
  const { setMehendiArtists } = useContext(LoginUserContext);
  const [previousWorkImages, setPreviousWorkImages] = useState([]);
  const [isNew, setIsNew] = useState(false)

  // Fetch artist data on component mount
  useEffect(() => {
    console.log("Test");
    const fetchArtist = async () => {
      try {
        const fetchedArtist = await MehendiArtistsService.getMehendiArtistById(
          axiosPrivate,
          id
        );
        setArtist(fetchedArtist);
        setPreviousWorkImages(JSON.parse(fetchedArtist.workImages))  
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };
    fetchArtist();
  }, [axiosPrivate, id]);

  const onSubmit = async (data) => {
    try {debugger;
      const formData = new FormData();
      formData.append("_id", id);
      formData.append("businessName", data.businessName);
      formData.append("address", data.address);
      formData.append("priceQuote", data.priceQuote);
      formData.append("artistDescription", data.artistDescription);
      formData.append("workDescription", data.workDescription);
      formData.append("contactInfo", data.contactInfo);
      formData.append("image", data.image ? data.image[0]?.name? data.image[0].name: artist.image : artist.image); // Assuming single image upload
      var arr = [];
      for (var i = 0; i < previousWorkImages.length; i++) {
        arr[i] = previousWorkImages[i].name
          ? previousWorkImages[i].name
          : previousWorkImages[i];
      }
      formData.append("workImages", JSON.stringify(arr));

      // Send updated artist data to the backend
      await MehendiArtistsService.updateMehendiArtist(
        axiosPrivate,
        id,
        formData
      );

      setMehendiArtists((prevArtists) => {
        const updatedArtists = prevArtists.map((prevArtist) => {
          if (prevArtist._id === id) {
            return { ...prevArtist, ...data };
          }
          return prevArtist;
        });
        return updatedArtists;
      });

      enqueueSnackbar("Mehendi Artist updated successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.error("Error updating artist:", error);
      enqueueSnackbar("Error while updating a Mehendi Artist", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
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
  if (!artist) {
    return (
      <Container>
        <Typography variant="h3">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Edit Mehendi Artist
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Business Name"
            {...register("businessName")}
            defaultValue={artist.businessName}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Address"
            {...register("address")}
            defaultValue={artist.address}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Price Quote"
            {...register("priceQuote")}
            defaultValue={artist.priceQuote}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="About the Artist"
            {...register("artistDescription")}
            defaultValue={artist.artistDescription}
            multiline
            rows={4}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Description of Work"
            {...register("workDescription")}
            defaultValue={artist.workDescription}
            multiline
            rows={4}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Contact Info"
            {...register("contactInfo")}
            defaultValue={artist.contactInfo}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <InputLabel htmlFor="mehendi-artist-image">Artist Image</InputLabel>
          <Input
            id="mehendi-artist-image"
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
          {artist.image && (
            <Typography variant="body1">
              Existing Image: {artist.image}
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

export default EditMehendiArtist;
