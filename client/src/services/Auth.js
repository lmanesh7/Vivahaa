import axios from "../api/axios"
import endpoints from "../constants/endpoints"

const { auth } = endpoints

export const loginUser = async (email, password) => {
  const url = auth.login.url()
  const method = auth.login.method

  const response = await axios({
    url,
    method,
    data: { email, password },
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  })

  return { accessToken: response.data?.accessToken, id: response.data?.id }
}
