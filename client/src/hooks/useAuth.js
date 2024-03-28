import { useContext, useMemo } from "react"
import AuthContext from "../context/AuthProvider"

const useAuth = () => {
  const { auth, setAuth, persist, setPersist } = useContext(AuthContext)

  const isLogged = useMemo(() => !!auth?.accessToken, [auth])
  
  return { auth, setAuth, persist, setPersist, isLogged }
}

export default useAuth
