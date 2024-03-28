import React, { useState } from 'react';
import './BookingForm.css'; // Import CSS for styling the form
import Venue from './vendor/forms/Venue';
import axios from '../api/axios';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from "react-router";
const BookingForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const vendorType = useParams('vendorType');
  const vendorId = useParams('id');
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };
  const vendor = {
    "workImages": [],
    "_id": "65e7aae1de3b05dea72129d4",
    "businessName": "Sample Venue 4620",
    "address": "123 Main Street, City, Country",
    "priceQuote": "$1000 - $1500",
    "description": "A beautiful venue for weddings and events, featuring modern amenities and elegant decor.",
    "contactInfo": "info@example.com | +1 (123) 456-7890",
    "seatingCapacity": 150,
    "image": "venues.jpeg",
    "cuisinesAvailable": [
        "[\"Italian\",\"Mexican\"]"
    ],
    "facilitiesAvailable": [
        "[\"Parking\",\"Wi-Fi\"]"
    ],
    "pricePerPlateVeg": "$20 per plate",
    "pricePerPlateNonVeg": "$25 per plate",
    "createdBy": "65e75e52dff8613695c3420b",
    "createdAt": "2024-03-05T23:29:37.761Z",
    "updatedAt": "2024-03-05T23:29:37.761Z",
    "type": "venue",
    "__v": 0
}
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    address: '',
    eventDate: '',
    numberOfDates: '',
    notes: '',
    vendor:vendorId.id,
    user:sessionStorage.getItem('loggedInUser'),
    vendorType:vendorType.vendorType
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  if(sessionStorage.getItem('role')!='5152'){
    return (
      <h1>You are not authorized to view this page</h1>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    debugger;
    // Check if all required fields are filled
    const isFormValid = Object.values(formData).every(value => value !== '');
    if (!isFormValid) {
      alert('Please fill in all required fields.');
      return; 
    }
    // const formdata = new FormData();
    // formdata.append("fname",data.fname);
    // formdata.append("lname",data.lname);
    // formdata.append("phone",data.phone);
    // formdata.append("email",data.email)
    // formdata.append("address",data.address)
    // formdata.append("email",data.email)
    // formdata.append("eventDate",data.eventDate)
    // formdata.append("numberOfDates",data.numberOfDates)
    // formdata.append("vendor",vendor._id)
    // formdata.append("vendorType",vendor.type)
    // debugger;
    try{
    await axios.post('/api/savebooking',formData)

    // fetch('http://localhost:3500/api/savebooking', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    // .then(response => {
    //   // Handle response
    //   console.log('Booking saved successfully!');
    // })
    // .catch(error => {
    //   // Handle error
    //   console.error('Booking failed!');
    //   return ;
    // });
    enqueueSnackbar("Booking sent successfully", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
    navigate(`/view-venue/${vendor._id}`, { replace: true });
    }
    catch(error){
      console.error(error);
      enqueueSnackbar("Error while Booking", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  }

  return (
    <div className="row">
    <div className="col-md-6 col-md-offset-3">
      <form id="msform">
        {/* progressbar */}
        <ul id="progressbar">
          <li className={step === 1 ? "active" : ""}>Personal Details</li>
          <li className={step === 2 ? "active" : ""}>Contact Information</li>
          <li className={step === 3 ? "active" : ""}>Event Details</li>
        </ul>
        {/* fieldsets */}
        <fieldset style={{ display: step === 1 ? "block" : "none" }}>
          <h2 className="fs-title">Personal Details</h2>
          <h3 className="fs-subtitle">Tell us something more about you</h3>
          <input type="text" name="fname" placeholder="First Name" value={formData.fname} onChange={handleChange} required/>
          <input type="text" name="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange} required />
          <input type="button" className="next action-button" value="Next" onClick={nextStep} />
        </fieldset>
        <fieldset style={{ display: step === 2 ? "block" : "none" }}>
          <h2 className="fs-title">Contact Information</h2>
          <h3 className="fs-subtitle">Provide your contact details</h3>
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required/>
          <input type="button" className="previous action-button-previous" value="Previous" onClick={prevStep} required/>
          <input type="button" className="next action-button" value="Next" onClick={nextStep} />
        </fieldset>
        <fieldset style={{ display: step === 3 ? "block" : "none" }}>
          <h2 className="fs-title">Event Details</h2>
          <h3 className="fs-subtitle">Provide information about your event</h3>
          <input type="date" name="eventDate" placeholder="Event Date" value={formData.eventDate} onChange={handleChange} required/>
          <input type="number" name="numberOfDates" placeholder="Number of Dates Anticipated" value={formData.numberOfDates} onChange={handleChange} required/>
          <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>
          <input type="button" className="previous action-button-previous" value="Previous" onClick={prevStep} />
          <input type="submit" className="submit action-button" value="Submit" onClick={handleSubmit} />
        </fieldset>
      </form>
    </div>
  </div>
  );
};

export default BookingForm;
