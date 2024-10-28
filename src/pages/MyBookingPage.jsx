import React, { useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import jsPDF from "jspdf";
import PdfDownloader from "../components/PdfDownloader";

function BookingForm() {
  // Separate states for each form field
  const [referenceNumber, setReferenceNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    referenceNumber: "",
    phone: "",
  });
  const [responseData, setResponseData] = useState(null);

  const handleDownloadPDF = (e) => {
    e.preventDefault();
    generatePDF(dummyBookingDetails);
  };

  const generatePDF = (bookingDetails) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Booking Confirmation", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${bookingDetails.name}`, 20, 40);
    doc.text(`Date: ${bookingDetails.date}`, 20, 50);
    doc.text(`Time: ${bookingDetails.time}`, 20, 60);
    doc.text(`Doctor: ${bookingDetails.doctor}`, 20, 70);
    doc.text(`Reference Number: ${bookingDetails.referenceNumber}`, 20, 80);
    doc.save("booking_confirmation.pdf");
  };

  // Handle input changes for each field
  const handleReferenceNumberChange = (e) => {
    setReferenceNumber(e.target.value);
    if (errors.referenceNumber) {
      setErrors({ ...errors, referenceNumber: "" }); // Clear error when user starts typing
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!referenceNumber) {
      formIsValid = false;
      newErrors.referenceNumber = "Reference Number is required";
    }

    if (!phone) {
      formIsValid = false;
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      formIsValid = false;
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/bookings/${referenceNumber}?phone=${phone}`
        );

        setResponseData(response.data);
        console.log("Data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrors({
          ...errors,
          form: "There is no booking",
        });
      }
    }
  };

  return (
    <div className="mt-[95px] md:mt-[150px] w-full max-w-xs md:max-w-lg mx-auto bg-white p-3 md:p-8 border rounded-lg shadow-md">
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-10 pl-2">
            Search Booking
          </h2>
          <label className="flex items-center space-x-2">
            <i className="fas fa-user text-gray-400"></i>
            <input
              type="text"
              value={referenceNumber}
              onChange={handleReferenceNumberChange}
              placeholder="Reference Number - Required"
              className="w-full border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-gray-600"
            />
          </label>
          {errors.referenceNumber && (
            <p className="pl-3 text-red-500 text-sm">
              {errors.referenceNumber}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <i className="fas fa-phone-alt text-gray-400"></i>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Phone - Required"
              className="w-full border-b-2 border-gray-300 focus:border-primary outline-none py-2 text-gray-600"
            />
          </label>
          {errors.phone && (
            <p className="pl-3 text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary hover:bg-opacity-90 text-white py-2 rounded flex items-center justify-center space-x-2"
        >
          <i className="fas fa-search"></i>
          <span>Search</span>
        </button>
        {errors.form && (
          <p className="text-red-500 text-sm mt-4">{errors.form}</p>
        )}
        <div className="mt-4 text-sm text-gray-500">
          <p className="text-primary">
            *Only 20 attempts are allowed per booking
          </p>
          <p className="text-primary">
            *Please use the local phone number entered under patient’s details.
            This feature is not available for foreign numbers.
          </p>
        </div>
      </form>
      {true && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-primary font-bold">Fetched Data:</h3>
          <pre className="text-sm text-gray-700">
            {JSON.stringify(responseData, null, 2)}
          </pre>
          <button onClick={handleDownloadPDF}>Download pdf</button>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
