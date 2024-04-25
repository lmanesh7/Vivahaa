import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Box,
  Button,
} from "@mui/material";

import axios from "../api/axios";
import { enqueueSnackbar } from "notistack";
import { Star } from "@mui/icons-material";
import useAuth from "../hooks/useAuth";
import LoginUserContext from "../context/LoginUserProvider";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getUserDetails } from "../services/User";

const ReviewForm = () => {
  const { isLogged, auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const userId = useParams("id");
  const { user, setUser } = React.useContext(LoginUserContext);
  const [userReview, setUserReview] = useState({
    author: user?.fullName,
    rating: 0,
    comment: "",
    serviceId: userId.serviceId, // Assuming venueId is accessible here
    user: userId.id,
  });

  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "John Doe",
      rating: 4,
      comment: "Great venue, excellent service!",
    },
    {
      id: 2,
      author: "Jane Smith",
      rating: 5,
      comment: "Wonderful experience, highly recommended!",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserDetails(axiosPrivate, auth.id);
        setUser(userData);
        debugger;
        setUserReview({
          author: userData?.fullName,
          rating: 0,
          comment: "",
          serviceId: userId.serviceId,
          user: userData._id,
        });
      } catch {}
    };
    debugger
    fetchData();
  });

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setUserReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleStarClick = (rating) => {
    setUserReview((prevReview) => ({
      ...prevReview,
      rating: rating,
    }));
  };

  const submitReview = async () => {
    // Add your logic to submit the review to the backend
    // Once the review is submitted successfully, you may want to update the UI accordingly
    try {
      const response = await axios.post("/api/saveReview", userReview);
      console.log("Review submitted successfully:", response.data);
      enqueueSnackbar("Review submitted successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      // Clear the userReview state after successful submission
      setUserReview({
        author: sessionStorage.getItem("loggedInUsername"),
        rating: 0,
        comment: "",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      enqueueSnackbar("Error while submitting the review", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
    // For demo purposes, let's just add the review to the existing reviews state
    setReviews((prevReviews) => [
      ...prevReviews,
      {
        id: prevReviews.length + 1,
        author: userReview.author,
        rating: userReview.rating,
        comment: userReview.comment,
      },
    ]);
    setUserReview({
      author: "",
      rating: 0,
      comment: "",
    });
  };


//   if (!isLogged) {
//     setTimeout(() => {
//       sessionStorage.setItem(
//         "currentPage",
//         `/write-a-review/${userId.id}/${userId.serviceId}`
//       );
//       window.location = "/login";
//     }, 2000);
//     return null;
//   }

  if (
    (!isLogged && sessionStorage.getItem("role") != "5152") ||
    userId.id != user?.id
  ) {
    return <h1>You are not authorized to view this page</h1>;
  }

  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Write a Review
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Your Name"
            name="author"
            value={userReview.author}
            onChange={handleReviewInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" gutterBottom>
            Your Rating:
          </Typography>
          <Box display="flex">
            {[1, 2, 3, 4, 5].map((rating) => (
              <IconButton key={rating} onClick={() => handleStarClick(rating)}>
                {rating <= userReview.rating ? (
                  <Star color="primary" />
                ) : (
                  <Star />
                )}
              </IconButton>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Your Review"
            name="comment"
            value={userReview.comment}
            onChange={handleReviewInputChange}
            multiline
            rows={4}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={submitReview}>
            Submit Review
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReviewForm;
