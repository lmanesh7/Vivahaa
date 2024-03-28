import { useEffect, useMemo, useState } from "react";
import { getAllServices } from "../services/Services";
import { useSnackbar } from 'notistack'

const useServices = () => {
  const [mehendiArtists, setMehendiArtists] = useState([])
  const [venues, setVenues] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  

  useEffect(() => {
    getAllServices().then((services) => {
      setMehendiArtists(services.mehendiArtists)
      setVenues(services.venues)
    }).catch(() => {
      enqueueSnackbar('Error while fetching services info', { variant: 'error', anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      } })
    })
  }, [])


  return useMemo(() => ({ mehendiArtists, venues}), [mehendiArtists, venues])
}

export default useServices
