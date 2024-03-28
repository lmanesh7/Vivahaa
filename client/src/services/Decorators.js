import axios, { axiosPrivate } from "../api/axios";
import endpoints from "../constants/endpoints";

const { decorators } = endpoints

const decoratorsService = {
  getAlldecorators: async () => {
    try {
      const method = decorators.all.method
      const url = decorators.all.url()

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
  getdecoratorsById: async (axiosPrivate, Id) => {
    try {
      const method = decorators.byId.method
      const url = decorators.byId.url(Id)

      const response = await axiosPrivate({ url, method })
      return response.data;
    } catch (error) {
      throw new Error(error.response);
    }
  },
  updatedecorator: async(axiosPrivate, id, data) => {
    try{
      const method= decorators.update.method
      const url = decorators.update.url(id)

      const response = await axiosPrivate({url, method, data})
      return response.data;
    }
    catch(error){
      throw new Error(error.response);
    }

  },

  // getdecoratorById: async (id) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/decorators/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(error.response.data.message);
  //   }
  // },

  createdecorator: async (axiosPrivate, decoratorData) => {
    try {
        
      const method = decorators.create.method
      const url = decorators.create.url()

      const response = await axiosPrivate({
        url,
        method,
        data: decoratorData
      })
      return response.data;
    } catch (error) {
      throw new Error(error.response);
    }
  },

  uploaddecoratorImage: async (axiosPrivate, image) => {
    try{
      const method = decorators.uploadImage
      const url = decorators.uploadImage.url()
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

  // updatedecorator: async (id, decoratorData) => {
  //   try {
  //     const response = await axios.put(`${BASE_URL}/decorators/${id}`, decoratorData);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(error.response.data.message);
  //   }
  // },

  // deletedecorator: async (id) => {
  //   try {
  //     const response = await axios.delete(`${BASE_URL}/decorators/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(error.response.data.message);
  //   }
  // },

  getdecoratorsByUserId: async (axiosPrivate, userId) => {
    try {
      const method = decorators.byUserId.method
      const url = decorators.byUserId.url(userId)

      const response = await axiosPrivate({ url, method })
      return response.data;
    } catch (error) {
      throw new Error(error.response);
    }
  },
  deletedecorator: async (axiosPrivate, id) => {
    try{
      const method = decorators.delete.method
      const url = decorators.delete.url(id)

      const response = await axiosPrivate({url,method})
      return response.data;
    }
    catch(error){
      throw new Error(error.response);
    }
  }
};

export default decoratorsService;
