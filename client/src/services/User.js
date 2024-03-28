import endpoints from "../constants/endpoints"

const { user } = endpoints

export const getUserDetails = async (axiosPrivate, userId) => {
  const url = user.profile.url(userId)
  const method = user.profile.method

  const response = await axiosPrivate({
    url,
    method
  })

  return response.data
}
