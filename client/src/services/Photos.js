import axios, { axiosPrivate } from "../api/axios";
import endpoints from "../constants/endpoints";

const { photos } = endpoints

const PhotoService = {



  createPhoto: async (axiosPrivate, photoData) => {
    try {
      const method = photos.create.method
      const url = photos.create.url()

      const response = await axiosPrivate({
        url,
        method,
        data: photoData
      });
       // Check if 'data' property exists in the response
       if (response && response.data) {
        return response.data;
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      // Log the specific error details
      console.error("Error creating photo:", error);

      // If there's an error in the HTTP request, the 'response' object might be undefined
      if (error.response && error.response.data) {
        // Log the specific error response data
        console.error("Response data:", error.response.data);
        // Handle specific error messages if needed
        throw new Error(error.response.data);
      } else {
        // Handle other types of errors
        throw new Error("Failed to create photo");
      } 
    }
  },

  getPhotographerByUserId: async (axiosPrivate, userId) => {
    try {
      const method = photos.byUserId.method
      const url = photos.byUserId.url(userId)

      const response = await axiosPrivate({ url, method })
      return response.data;
    } catch (error) {
      throw new Error(error.response);
    }
  },


  getAllPhotographers: async () => {
    try{
      const method = photos.all.method;
      const url = photos.all.url();

      const response = await axios({url, method})
      return response.data;

    }
    catch(error){
      throw new Error(error.response);

    }
  },

  deletePhotographerById: async (axiosPrivate, id) => {
    try{
    const method = photos.delete.method();
    const url = photos.delete.url();

    const response = await axiosPrivate({url, method})
    return response.data;
    }
    catch(error){
      throw new Error(error.response); 
    }
  }
















};
export default PhotoService;

