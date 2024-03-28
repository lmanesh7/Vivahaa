import React, { useContext, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
  containerClasses,
} from "@mui/material";
import venuesLogo from "../../images/venues.jpeg";
import photographersLogo from "../../images/photographers.webp";
import mehendiLogo from "../../images/mehendi-artists.jpg";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import GridWithClickableCards from "../GridWithClickableCards";
import LoginUserContext from "../../context/LoginUserProvider";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VenuesService from "../../services/Venues";
import axios, { axiosPrivate } from "../../api/axios";
import { enqueueSnackbar } from "notistack";
import MehendiArtistsService from "../../services/MehendiArtists";
import decoratorsService from "../../services/Decorators";
import PhotoService from "../../services/Photos";

const AddServiceCard = ({ handleCardClick }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: "4px",
        borderStyle: "dashed",
        borderColor: "primary.main",
      }}
      variant="outlined"
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        onClick={handleCardClick}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddCircleSharpIcon fontSize="large" color="primary" />
          <Typography variant="body1" align="center">
            Add New Service
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const createGridItems = (gridItemsList, handleMenuOpen) => {
  return gridItemsList.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <CardActionArea component={Link} to={`/edit-venue/${item._id}`}>
          <CardMedia
            component="img"
            height="140"
            image={`http://localhost:3500/uploads/images/${item.image}`}
            alt={item.businessName}
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              {item.businessName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Address:</strong> {item.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Price Quote:</strong> {item.priceQuote}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Contact Info:</strong> {item.contactInfo}
            </Typography>
          </CardContent>
        </CardActionArea>
        <IconButton
          aria-label="more"
          sx={{ position: "absolute", bottom: 8, right: 8 }}
          onClick={(event) => handleMenuOpen(event, item)}
        >
          <MoreVertIcon />
        </IconButton>
      </Card>
    </Grid>
  ));
};

const createGridItems_Mehendi = (gridItemsList, handleMenuOpen) => {
  return gridItemsList.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <CardActionArea
          component={Link}
          to={`/edit-mehendi-artist/${item._id}`}
        >
          <CardMedia
            component="img"
            height="140"
            image={`http://localhost:3500/uploads/images/${item.image}`}
            alt={item.businessName}
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              {item.businessName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Address:</strong> {item.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Price Quote:</strong> {item.priceQuote}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Contact Info:</strong> {item.contactInfo}
            </Typography>
          </CardContent>
        </CardActionArea>
        <IconButton
          aria-label="more"
          sx={{ position: "absolute", bottom: 8, right: 8 }}
          onClick={(event) => handleMenuOpen(event, item)}
        >
          <MoreVertIcon />
        </IconButton>
      </Card>
    </Grid>
  ));
};

const createGridItems_Decorator = (gridItemsList, handleMenuOpen) => {
  return gridItemsList.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <CardActionArea component={Link} to={`/edit-decorator/${item._id}`}>
          <CardMedia
            component="img"
            height="140"
            image={`http://localhost:3500/uploads/images/${item.image}`}
            alt={item.businessName}
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              {item.businessName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Address:</strong> {item.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Decor Type:</strong> {item.services}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Price:</strong> {item.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <IconButton
          aria-label="more"
          sx={{ position: "absolute", bottom: 8, right: 8 }}
          onClick={(event) => handleMenuOpen(event, item)}
        >
          <MoreVertIcon />
        </IconButton>
      </Card>
    </Grid>
  ));
};
const createGridItems_Photographer = (gridItemsList, handleMenuOpen) => {
  
  return gridItemsList.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' , position: 'relative'}}>
    <CardActionArea component={Link} to={`/view-photographer/${item._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:3500/uploads/images/${item.image}`}
          alt={item.businessName}
        />
     
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {item.businessName}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Address:</strong> {item.address}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Price Quote:</strong> {item.priceQuote}
        </Typography> */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>About:</strong> {item.About}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Contact Info:</strong> {item.contact}
        </Typography>
     
      </CardContent>
      </CardActionArea>
      <IconButton
          aria-label="more"
          sx={{ position: 'absolute', bottom: 8, right: 8 }}
          onClick={(event) => handleMenuOpen(event, item)}
        >
          <MoreVertIcon />
        </IconButton>
    </Card>
  </Grid>
  
  
  ))
}

const MyServices = () => {
  const [open, setOpen] = React.useState(false);
  const { venues, mehendiArtists, decorators, photographers } = useContext(LoginUserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const venuesList = venues.map((v) => {
    return {
      _id: v._id,
      businessName: v.businessName,
      description: v.description,
      image: v.image,
      seatingCapacity: v.seatingCapacity,
      cuisinesAvailable: v.cuisinesAvailable,
      facilitiesAvailable: v.facilitiesAvailable,
      pricePerPlateVeg: v.pricePerPlateVeg,
      pricePerPlateNonVeg: v.pricePerPlateNonVeg,
      address: v.address,
      contactInfo: v.contactInfo,
      priceQuote: v.priceQuote,
    };
  });

  const mehendiArtistsList = mehendiArtists.map((m) => {
    return {
      _id: m._id,
      businessName: m.businessName,
      description: m.workDescription,
      image: m.image,
      address: m.address,
      priceQuote: m.priceQuote,
      contactInfo: m.contactInfo,
    };
  });

  const decoratorsList = decorators.map((d) => {
    return {
      _id: d._id,
      businessName: d.businessName,
      serviceDescription: d.serviceDescription,
      services: d.services,
      price: d.price,
      address: d.address,
      image: d.image,
      email: d.email,
      phone: d.phone,
    };
  });

  const photographerList = photographers.map((p) => {
    return {
    _id: p._id,
    businessName: p.businessName,
    image: p.image,
    About: p.About,
    albumPrice: p.albumPrice,
    contact: p.contact,
    address: p.address
    }
  });
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleView = () => {
    // Handle edit action for the selected item
    if (selectedItem.cuisinesAvailable) {
      console.log("view clicked for venue:", selectedItem);
      window.location = `/view-venue/${selectedItem._id}`;
    } else if (selectedItem.description) {
      console.log("view clicked for mehindi:", selectedItem);
      window.location = `/view-mehindi-artist/${selectedItem._id}`;
    } else if (selectedItem.serviceDescription) {
      console.log("view clicked for decor:", selectedItem);
      window.location = `/view-decorator/${selectedItem._id}`;
    }
    else if (selectedItem.albumPrice){
      window.location = `/view-photographer/${selectedItem._id}`;
    }
    handleMenuClose();
  };

  const handleUpdate = () => {
    // Handle update action for the selected item
    console.log("Update clicked for:", selectedItem);

    if (selectedItem.cuisinesAvailable) {
      console.log("view clicked for venue:", selectedItem);
      window.location = `/edit-venue/${selectedItem._id}`;
    } else if (selectedItem.description) {
      console.log("view clicked for mehindi:", selectedItem);
      window.location = `/edit-mehendi-artist/${selectedItem._id}`;
    } else if (selectedItem.serviceDescription) {
      console.log("view clicked for decor:", selectedItem);
      window.location = `/edit-decorator/${selectedItem._id}`;
    }
    else if(selectedItem.albumPrice){
      window.location = `/edit-photo/${selectedItem._id}`;
    }
    handleMenuClose();
  };
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const handleDelete = async () => {
    // Handle delete action for the selected item
    console.log("Delete clicked for:", selectedItem);
    if (window.confirm("Are you sure you want to delete?")) {
      if (selectedItem.cuisinesAvailable) {
        try {
          await VenuesService.deleteVenueById(axiosPrivate, selectedItem._id);
          enqueueSnackbar("Venue deleted successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          await timeout(1000);
          window.location = "./vendor-dashboard";
        } catch (error) {
          console.error("error deleteing the venue", error);
          enqueueSnackbar("Error while deleting a venue", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          // await timeout(1000);
          // window.location = './vendor-dashboard';
        }
      } else if (selectedItem.description) {
        try {
          await MehendiArtistsService.deleteMehendiArtist(
            axiosPrivate,
            selectedItem._id
          );
          enqueueSnackbar("Mehendi Artist deleted successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          await timeout(1000);
          window.location = "./vendor-dashboard";
        } catch (error) {
          console.error("error deleteing the mehendi artist", error);
          enqueueSnackbar("Error while deleting a mehendi artist", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          // await timeout(1000);
          // window.location = './vendor-dashboard';
        }
      } else if (selectedItem.serviceDescription) {
        try {
          await decoratorsService.deletedecorator(
            axiosPrivate,
            selectedItem._id
          );
          enqueueSnackbar("Venue deleted successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          await timeout(1000);
          window.location = "./vendor-dashboard";
        } catch (error) {
          console.error("error deleteing the decorator", error);
          enqueueSnackbar("Error while deleting a decorator", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          // await timeout(1000);
          // window.location = './vendor-dashboard';
        }
      }
      else if (selectedItem.albumPrice) {
        try {debugger;
          // await PhotoService.deletePhotographerById(
          //   axiosPrivate,
          //   selectedItem._id
          // );
          await axios.delete(`/api/photo/delete/${selectedItem._id}`);
          enqueueSnackbar("Photographer deleted successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          await timeout(1000);
          window.location = "./vendor-dashboard";
        } catch (error) {
          console.error("error deleteing the photographer", error);
          enqueueSnackbar("Error while deleting a photographer", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          // await timeout(1000);
          // window.location = './vendor-dashboard';
        }
      }
    }

    handleMenuClose();
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const gridItems = createGridItems([...venuesList], handleMenuOpen);
  const gridItems_mehindi = createGridItems_Mehendi(
    [...mehendiArtistsList],
    handleMenuOpen
  );
  const gridItems_decorators = createGridItems_Decorator(
    [...decoratorsList],
    handleMenuOpen
  );
  const gridItems_photographers = createGridItems_Photographer([...photographerList],handleMenuOpen);
  gridItems.unshift(
    <Grid item xs={12} sm={6} md={4} key="add-service">
      <AddServiceCard handleCardClick={handleClickOpen} />
    </Grid>
  );

  return (
    <>
      <Grid container spacing={2}>
        {gridItems}
        {gridItems_mehindi}
        {gridItems_decorators}
        {gridItems_photographers}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="md"
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Select the Services You Offer
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <GridWithClickableCards />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleView}>View</MenuItem>
        <MenuItem onClick={handleUpdate}>Update</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default MyServices;
