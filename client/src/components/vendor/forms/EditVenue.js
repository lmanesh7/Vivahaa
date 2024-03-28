import React, { useState, useEffect } from "react";
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
import { useForm, Controller } from "react-hook-form";
import VenuesService from "../../../services/Venues";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useSnackbar } from "notistack";

const EditVenue = () => {
  const { id } = useParams(); // Get the venue ID from the URL params
  const axiosPrivate = useAxiosPrivate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [venue, setVenue] = useState(null);
  const [previousWorkImages, setPreviousWorkImages] = useState([]);
  const [isNew, setIsNew] = useState(false)

  // Fetch venue data on component mount
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        var fetchedVenue_ = await VenuesService.getVenuesById(axiosPrivate, id);
        var fa = fetchedVenue_.facilitiesAvailable;
        fa = JSON.parse(fa);
        var ca = fetchedVenue_.cuisinesAvailable;
        ca = JSON.parse(ca);
        fetchedVenue_.cuisinesAvailable = ca;
        fetchedVenue_.facilitiesAvailable = fa;

        const fetchedVenue = fetchedVenue_;
        console.log(fetchedVenue);
        setVenue(fetchedVenue);
        setPreviousWorkImages(JSON.parse(fetchedVenue.workImages));
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };
    fetchVenue();
  }, [axiosPrivate, id]);
  

  const onSubmit = async (data) => {
    try {debugger;
      const formData = new FormData();
      formData.append("_id", id);
      formData.append("businessName", data.businessName);
      formData.append("address", data.address);
      formData.append("priceQuote", data.priceQuote);
      formData.append("description", data.description);
      formData.append("contactInfo", data.contactInfo);
      formData.append("seatingCapacity", data.seatingCapacity);
      formData.append("image", data.image ? data.image[0]?.name? data.image[0].name: venue.image : venue.image); // Assuming single image upload
      formData.append("pricePerPlateVeg", data.pricePerPlateVeg);
      formData.append("pricePerPlateNonVeg", data.pricePerPlateNonVeg);
      formData.append(
        "cuisinesAvailable",
        JSON.stringify(data.cuisinesAvailable)
      );
      formData.append(
        "facilitiesAvailable",
        JSON.stringify(data.facilitiesAvailable)
      );
      var arr = [];
      for (var i = 0; i < previousWorkImages.length; i++) {
        arr[i] = previousWorkImages[i].name?previousWorkImages[i].name:previousWorkImages[i];
      }

      formData.append("workImages", JSON.stringify(arr));

      // Send updated venue data to the backend
      const response = await VenuesService.updateVenue(
        axiosPrivate,
        id,
        formData
      );
      console.log(response);
      enqueueSnackbar("Decorator updated successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.error("Error updating decorator:", error);
      enqueueSnackbar("Error while updating a decorator", {
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
  if (!venue) {
    return (
      <Container>
        <Typography variant="h3">Loading...</Typography>
      </Container>
    );
  }

  const Cuisine_Types = ["Italian", "Mexican", "Indian"];
  const Facility_Types = ["Parking", "Wi-Fi", "Projector"];

  const placeholderValues = {
    cuisinesAvailable: "Select cuisines available",
    facilitiesAvailable: "Select facilities available",
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Edit Venue
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Business Name"
            {...register("businessName")}
            defaultValue={venue.businessName}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Address"
            {...register("address")}
            defaultValue={venue.address}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Price Quote"
            {...register("priceQuote")}
            defaultValue={venue.priceQuote}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Description of the Service and Venue"
            {...register("description")}
            defaultValue={venue.description}
            multiline
            rows={4}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Contact Info"
            {...register("contactInfo")}
            defaultValue={venue.contactInfo}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Seating Capacity"
            {...register("seatingCapacity")}
            defaultValue={venue.seatingCapacity}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <InputLabel id="cuisines-available-label">
            Cuisines Available
          </InputLabel>
          <Controller
            name="cuisinesAvailable"
            control={control}
            defaultValue={venue.cuisinesAvailable}
            render={({ field }) => (
              <Select
                {...field}
                labelId="cuisines-available-label"
                id="cuisines-available"
                label="Cuisines Available"
                multiple
                error={!!errors.cuisinesAvailable}
                placeholder={placeholderValues.cuisinesAvailable}
                sx={{ minWidth: 120 }}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {Cuisine_Types.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.cuisinesAvailable && (
            <Typography variant="caption" color="error">
              {errors.cuisinesAvailable.message}
            </Typography>
          )}
        </Box>
        <Box sx={{ mb: 2 }}>
          <InputLabel id="facilities-available-label">
            Facilities Available
          </InputLabel>
          <Controller
            name="facilitiesAvailable"
            control={control}
            defaultValue={venue.facilitiesAvailable}
            render={({ field }) => (
              <Select
                {...field}
                labelId="facilities-available-label"
                id="facilities-available"
                label="Facilities Available"
                multiple
                error={!!errors.facilitiesAvailable}
                placeholder={placeholderValues.facilitiesAvailable}
                sx={{ minWidth: 120 }}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {Facility_Types.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.facilitiesAvailable && (
            <Typography variant="caption" color="error">
              {errors.facilitiesAvailable.message}
            </Typography>
          )}
        </Box>
        <Box sx={{ mb: 2 }}>
          <InputLabel htmlFor="venue-image">Venue Image</InputLabel>
          <Input
            id="venue-image"
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
          {venue.image && (
            <Typography variant="body1">
              Existing Image: {venue.image}
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
                  src={image.name?URL.createObjectURL(image):`http://localhost:3500/uploads/images/${image}`}
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

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Price Per Plate - Veg"
            {...register("pricePerPlateVeg")}
            defaultValue={venue.pricePerPlateVeg}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Price Per Plate - Non-Veg"
            {...register("pricePerPlateNonVeg")}
            defaultValue={venue.pricePerPlateNonVeg}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
    </Container>
  );
};

export default EditVenue;
