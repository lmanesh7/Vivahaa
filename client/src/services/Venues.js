import axios, { axiosPrivate } from "../api/axios";
import endpoints from "../constants/endpoints";

const { venues } = endpoints

const VenuesService = {
  getAllVenues: async () => {
    try {
      const method = venues.all.method
      const url = venues.all.url()

      const response = await axios({
        url,
        method,
        headers: { "Content-Type": "application/json" }
      })
      return response.data
    } catch (error) {
      throw new Error(error.response)
    }
  },
  getVenuesById: async (axiosPrivate, Id) => {
    try {
      const method = venues.byId.method
      const url = venues.byId.url(Id)

      const response = await axiosPrivate({ url, method })
      return response.data;
    } catch (error) {
      throw new Error(error.response);
    }
  },
  updateVenue: async(axiosPrivate, id, data) => {
    try{
      const method= venues.update.method
      const url = venues.update.url(id)

      const response = await axiosPrivate({url, method, data})
      return response.data;
    }
    catch(error){
      throw new Error(error.response);
    }

  },

  // getVenueById: async (id) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/venues/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(error.response.data.message);
  //   }
  // },

  createVenue: async (axiosPrivate, venueData) => {
    try {
      const method = venues.create.method
      const url = venues.create.url()

      const response = await axiosPrivate({
        url,
        method,
        data: venueData
      })
      return response.data;
    } catch (error) {
      throw new Error(error.response);
    }
  },

  uploadVenueImage: async (axiosPrivate, image) => {
    try{
      const method = venues.uploadImage
      const url = venues.uploadImage.url()
      const response = await axiosPrivate({
        url,
        method,
        image: image
      })
      return response.data;
    }
    catch(error){
      throw new Error(error.response)
    }
  },

  // updateVenue: async (id, venueData) => {
  //   try {
  //     const response = await axios.put(`${BASE_URL}/venues/${id}`, venueData);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(error.response.data.message);
  //   }
  // },

  // deleteVenue: async (id) => {
  //   try {
  //     const response = await axios.delete(`${BASE_URL}/venues/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(error.response.data.message);
  //   }
  // },

  getVenuesByUserId: async (axiosPrivate, userId) => {
    try {
      const method = venues.byUserId.method
      const url = venues.byUserId.url(userId)

      const response = await axiosPrivate({ url, method })
      return response.data;
    } catch (error) {
      throw new Error(error.response);
    }
  },
  
deleteVenueById: async (axiosPrivate, id)=>{
  try{
    const method = venues.delete.method
    const url = venues.delete.url(id)

    const response = await axiosPrivate({url, method})
    return response.data;

  }catch(error){
    throw new Error(error.response);
  }
}
};


export default VenuesService;
