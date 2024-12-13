import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Loader from "./Loader";
import axios from "axios";

export default function BookingForm({ scheduleId, setIsLoading, setError }) {
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const toggleBookingFormEdit = async (e) => {
    e.preventDefault();

    setIsEdit((prev) => !prev);
    const formData = {
      name,
      nic,
      contactNumber,
      email,
      address,
      scheduleId,
      date: new Date().toISOString(),
    };
    console.log("Form Data Submitted:", formData);
  };

  const formIsValid = () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      nic,
      contactNumber,
      email,
      address,
      scheduleId,
      date: new Date().toLocaleTimeString(),
    };
    console.log("Form Data Submitted:", formData);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/bookings/create",
        formData
      );
      if (response.status === 201) {
        console.log("Feedback submitted successfully", formData);
        <Navigate to={`/booking/submit/${response.data.referenceId}`} />;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Schedule not found.");
      } else {
        setError(error);
      }
    } finally {
      setName("");
      setNic("");
      setContactNumber("");
      setEmail("");
      setAddress("");
      setIsLoading(false);
    }
  };

  // Handle form submission
  {
    /*
   const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, contactNumber, subject, message };
    console.log("Form Data Submitted:", formData);
    try {
      const response = await fetch(
        "http://localhost:8080/api/contact-us/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Feedback submitted successfully", formData);
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setName("");
      setEmail("");
      setContactNumber("");
      setSubject("");
      setMessage("");
    }
  };
*/
  }
  return (
    <>
      {!isEdit && (
        <div className="flex  justify-center py-10 px-5 bg-white shadow-lg">
          <div className=" xl:px-8 rounded-lg  w-full  max-w-screen-lg">
            <h2 className="text-center text-2xl font-semibold mb-10">
              Consult with Our Experts{" "}
            </h2>

            <form
              onSubmit={toggleBookingFormEdit}
              className="flex flex-col md:gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your first name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="email"
                  >
                    NIC
                  </label>
                  <input
                    id="nic"
                    name="nic"
                    type="text"
                    required
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    placeholder="Enter your NIC number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="contactNumber"
                  >
                    Contact number
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="text"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter your contact number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="subject"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="message"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                ></input>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-700 focus:outline-none  focus:ring-teal-500"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isEdit && (
        <div className=" w-full p-5 bg-white rounded-2xl">
          <ul className="flex flex-col gap-5 bg-white ">
            <li>
              Name: <span className=" font-semibold">{name}</span>
            </li>
            <li>
              NIC: <span className=" font-semibold">{nic}</span>
            </li>
            <li>
              Contact Number:{" "}
              <span className=" font-semibold">{contactNumber}</span>
            </li>
            <li>
              Email: <span className=" font-semibold">{email}</span>
            </li>
            <li>
              Address: <span className=" font-semibold">{address}</span>
            </li>
          </ul>
          <div className="flex gap-5 mt-5">
            <button
              onClick={toggleBookingFormEdit}
              className=" border border-primary px-5 py-2 text-primary rounded-md flex items-center gap-2 hover:bg-primary hover:text-white duration-300"
            >
              <FaEdit />
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className="bg-primary text-white px-5 py-2 rounded-md hover:opacity-50 duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      )}{" "}
    </>
  );
}
