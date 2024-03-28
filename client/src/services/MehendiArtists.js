import axios, { axiosPrivate } from "../api/axios"
import endpoints from "../constants/endpoints"

const { mehendiArtists } = endpoints

const MehendiArtistsService = {
  createMehendiArtist: async (axiosPrivate, mehendiArtistData) => {
    try {
      const method = mehendiArtists.create.method
      const url = mehendiArtists.create.url()

      const response = await axiosPrivate({
        url,
        method,
        data: mehendiArtistData
      })
      return response.data
    } catch (error) {
      throw new Error(error.response)
    }
  },
  getMehendiArtistsByUserId: async (axiosPrivate, userId) => {
    try {
      const method = mehendiArtists.byUserId.method
      const url = mehendiArtists.byUserId.url(userId)

      const response = await axiosPrivate({ url, method })
      return response.data
    } catch (error) {
      throw new Error(error.response)
    }
  },
  getAllMehendiArtists: async () => {
    try {
      const method = mehendiArtists.all.method
      const url = mehendiArtists.all.url()

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
  getMehendiArtistById: async ( axiosPrivate, id) => {
    try {
      const method = mehendiArtists.byId.method
      const url = mehendiArtists.byId.url(id)
      const response = await axiosPrivate({
        url,
        method,
        headers: { "Content-Type": "application/json" }
      })
      return response.data
    } catch (error) {
      throw new Error(error.response)
    }
  },
  updateMehendiArtist: async(axiosPrivate, id, data) => {
    try{
      const method= mehendiArtists.update.method
      const url = mehendiArtists.update.url(id)

      const response = await axiosPrivate({url, method, data})
      return response.data;
    }
    catch(error){
      throw new Error(error.response);
    }

  },
  deleteMehendiArtist: async (axiosPrivate, id) => {
    try{
      const method = mehendiArtists.delete.method
      const url = mehendiArtists.delete.url(id)
      const response = await axiosPrivate({url, method})
      return response.data;
    }
    catch(error)
    {
      throw new Error(error.response)
    }
  }
}

export default MehendiArtistsService
