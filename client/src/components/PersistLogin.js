import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const { auth, persist } = useAuth()

  useEffect(() => {
    let isMounted = true

    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.error('error', error)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    if (!auth.accessToken) {
      verifyRefreshToken()
    } else {
      setIsLoading(false)
    }

    return () => {
      isMounted = false
    }
  }, [])

  if(!persist) {
    return <Outlet />
  }

  return (
    <>
      {isLoading ? <p>Loading...</p> : <Outlet />}
    </>
  )
}

export default PersistLogin