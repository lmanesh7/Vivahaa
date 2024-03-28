import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { LoginUserProvider } from './context/LoginUserProvider'
import Unauthorized from './components/Unauthorized'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'

import theme from './theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider>
        <LoginUserProvider>
          <SnackbarProvider>
            <Routes>
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/*" element={<App />} />
            </Routes>
          </SnackbarProvider>
        </LoginUserProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
  ,
  document.getElementById('root')
)