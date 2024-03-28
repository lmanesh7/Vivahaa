import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const { auth, isLogged } = useAuth()

    useEffect(() => {
        let requestInterceptor, responseInterceptor
        if (isLogged) {
            requestInterceptor = axiosPrivate.interceptors.request.use(
                config => {
                    if (!config.headers.Authorization) {
                        config.headers.Authorization = `Bearer ${auth.accessToken}`
                    }
                    return config
                },
                error => Promise.reject(error)
            )

            responseInterceptor = axiosPrivate.interceptors.response.use(
                response => response,
                async error => {
                    const prevRequest = error.config
                    if (error.response?.status === 403 && !prevRequest?.sent) {
                        prevRequest.sent = true
                        const newAccessToken = await refresh()
                        // prevRequest.headers.Authorization = `Bearer ${newAccessToken}`
                        // return axiosPrivate(prevRequest)
                        const newRequestConfig = { ...prevRequest }

                        newRequestConfig.headers = {
                            ...prevRequest.headers,
                            Authorization: `Bearer ${newAccessToken}`,
                        }

                        return axiosPrivate(newRequestConfig)
                    }
                    return Promise.reject(error)
                }
            )
        }
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [auth, refresh])

    return axiosPrivate

}

export default useAxiosPrivate