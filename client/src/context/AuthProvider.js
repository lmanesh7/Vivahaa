import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist') || false))

  useEffect(() => {
    localStorage.setItem('persist', !!persist)
  }, [persist])


  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext