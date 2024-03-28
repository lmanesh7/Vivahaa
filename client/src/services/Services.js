import MehendiArtistsService from "./MehendiArtists"
import VenuesService from "./Venues"

export const getAllServices = async () => {
  const [mehendiArtists, venues] = await Promise.all([
    MehendiArtistsService.getAllMehendiArtists(),
    VenuesService.getAllVenues()
  ])

  return { mehendiArtists, venues }
}
