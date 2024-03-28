import React from 'react'
import { Outlet, Route } from "react-router-dom"
import Venue from "../components/vendor/forms/Venue"

const ProfileCreationRoutes = () => {
  return (
    <Outlet>
      <Route path="venue" element={<Venue />} />
      <Route path="makeup" element={<Venue />} />
      <Route path="decorator" element={<Venue />} />
      <Route path="photographer" element={<Venue />} />
    </Outlet>
  );
}

export default ProfileCreationRoutes
