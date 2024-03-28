import React, { createContext, useEffect, useState } from 'react'
import { getUserDetails } from '../services/User'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'
import VenuesService from '../services/Venues' // Assuming a function to fetch services data
import MehendiArtistsService from '../services/MehendiArtists'
import decoratorsService from '../services/Decorators'
import PhotoService from '../services/Photos'

const LoginUserContext = createContext({})

export const LoginUserProvider = ({ children }) => {
  const { isLogged, auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [user, setUser] = useState(null)
  const [venues, setVenues] = useState([])
  const [mehendiArtists, setMehendiArtists] = useState([])
  const [decorators, setDecorators] = useState([])
  const [photographers, setPhotographers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (isLogged) {
        setLoading(true)
        try {
          // Fetch user details
          const userData = await getUserDetails(axiosPrivate, auth.id)
          setUser(userData)

          sessionStorage.setItem('role',userData.roles);
          // Fetch services data
          const venuesData = await VenuesService.getVenuesByUserId(axiosPrivate, auth.id)
          setVenues(venuesData)
          
          const mehendiArtistData = await MehendiArtistsService.getMehendiArtistsByUserId(axiosPrivate, auth.id)
          setMehendiArtists(mehendiArtistData)
          
          const decoratorsData  = await decoratorsService.getdecoratorsByUserId(axiosPrivate, auth.id)
          setDecorators(decoratorsData)

          const photographerData = await PhotoService.getPhotographerByUserId(axiosPrivate, auth.id)
          setPhotographers(photographerData)
        } catch (error) {
          console.error('Error fetching user details:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setUser(null)
        setVenues([])
        setMehendiArtists([])
        setDecorators([])
        setPhotographers([])
      }
    }

    fetchData()
  }, [isLogged, auth.id, axiosPrivate])

  return (
    <LoginUserContext.Provider value={{ user, venues, setVenues, mehendiArtists, setMehendiArtists,decorators, setDecorators,photographers, setPhotographers, fetchUserInProgress: loading }}>
      {children}
    </LoginUserContext.Provider>
  )
}

export default LoginUserContext
