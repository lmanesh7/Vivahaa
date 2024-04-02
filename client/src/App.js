import React, { useContext } from 'react'
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import { CircularProgress, Container, AppBar, Toolbar, Box } from '@mui/material'
import HomePage from './components/HomePage'
import Login from './components/Login'
import PageHeader from './components/PageHeader'
import Footer from './components/Footer'
import useAuth from './hooks/useAuth'
import Register from './components/Register'
import PersistLogin from './components/PersistLogin'
import UserProfile from './components/UserProfile'
import LoginUserContext from './context/LoginUserProvider'
import Dashboard from './components/vendor/Dashboard'
import Venue from './components/vendor/forms/Venue'
import MehendiArtist from './components/vendor/forms/MehendiArtist'
import EditVenue from './components/vendor/forms/EditVenue'
import EditMehendiArtist from './components/vendor/forms/EditMehendiArtist'
import Decorators from './components/vendor/forms/Decorators'
import Photo from './components/vendor/forms/Photo'
import EditDecorator from './components/vendor/forms/EditDecorator'
import HomePageDasher from './components/HomePageDasher'
import VenueDetails from './components/VenueDetails'
import MehindiDetails from './components/MehindiDetails'
import DecorDetails from './components/DecorDetails'
import PhotoDetails from './components/PhotoDetails'
import BookingForm from './components/BookingForm'
import EditPhoto from './components/vendor/forms/EditPhoto'
import BookingPage from './components/vendor/BookingPage'
import ReplyPage from './components/ReplyPage'
import ImageSlider from './components/ImageSlider'
import CheckListApp from './components/CheckListApp'
import BudgetTracker from './components/BudgetTracker'

function App() {
  const { isLogged } = useAuth()
  const location = useLocation()
  const { fetchUserInProgress } = useContext(LoginUserContext)
  const showOnlyCopyright = location.pathname === '/'

  return (
    <>
      {fetchUserInProgress ? (
        <CircularProgress color="primary" />
      ) : (
        <>
          <PageHeader />
          <Box
            sx={(theme) => ({
              // height: `calc(100vh - 261px)`,
              width: '100%',
              backgroundImage:
                theme.palette.mode === 'light'
                  ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                  : 'linear-gradient(#02294F, #090E10)',
              backgroundSize: '100% 20%',
              backgroundRepeat: 'no-repeat',
            })}
          >
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 14, sm: 20 },
                pb: { xs: 4, sm: 6 },
              }}
            >
              <Routes>
                <Route element={<PersistLogin />}>
                  <Route path="/" element={<ImageSlider />} />
                  <Route path="/wedding-checklist" element={<CheckListApp />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/budget-tracker" element={<BudgetTracker />} />
                  <Route path="/show/:serviceType" element={<HomePageDasher />} />
                  <Route path="/user" element={<Outlet />} >
                    <Route path="profile" element={<UserProfile />} />
                  </Route>
                  <Route path="/vendor-dashboard" element={<Dashboard />} />
                  <Route path="/my-bookings" element={<BookingPage />} />
                  <Route path="/reply/:id" element={<ReplyPage />} />
                  <Route path="/booking/:vendorType/:id" element={<BookingForm />} />
                  <Route path="/view-venue/:venueId" element={<VenueDetails />} />
                  <Route path="/view-mehindi-artist/:venueId" element={<MehindiDetails />} />
                  <Route path="/view-decorator/:venueId" element={<DecorDetails />} />
                  <Route path="/view-photographer/:venueId" element={<PhotoDetails />} />
                  <Route path="/edit-venue/:id" element={<EditVenue />} />
                  <Route path="/edit-mehendi-artist/:id" element={<EditMehendiArtist />} />
                  <Route path="/edit-decorator/:id" element={<EditDecorator />} />
                  <Route path="/edit-photo/:id" element={<EditPhoto />} />
                  <Route path="photographer" element={<Photo />} />
                  <Route path="/profile-creation" element={<Outlet />} >
                    <Route path="venue" element={<Venue />} />
                    
                    <Route path="mehendi-artist" element={<MehendiArtist />} />
                    <Route path="decorator" element={<Decorators />} />
                    <Route path="photographer" element={<Photo />} />
                  </Route>
                </Route>
                <Route path="/login" element={isLogged ? <Navigate to="/" replace /> : <Login />} />
                <Route path="/register" element={isLogged ? <Navigate to="/" replace /> : <Register />} />
              </Routes>
            </Container>
          </Box>

          {/* <AppBar position="static" className="homepage-footer bg-white"> */}
          <Footer showOnlyCopyright={!showOnlyCopyright} />
          {/* </AppBar> */}
        </>
      )}
    </>
  )
}

export default App
