import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, nic, contactNumber, email, address };
    setIsSubmitted((prev) => !prev);
    console.log("Form Data Submitted:", formData);

    return <></>;
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
      {!isSubmitted && (
        <div className="flex  justify-center py-10 px-5 bg-white ">
          <div className=" xl:px-8 rounded-lg  w-full  max-w-screen-lg">
            <h2 className="text-center text-2xl font-semibold mb-10">
              Consult with Our Experts{" "}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:gap-4">
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
                  Book Appointment Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isSubmitted && (
        <div className=" w-full p-5 bg-white rounded-2xl">
          <ul className="flex flex-col gap-5 bg-white">
            <li>Name: {name}</li>
            <li>NIC: {nic}</li>
            <li>Contact Number: {contactNumber}</li>
            <li>Email: {email}</li>
            <li>Address: {address}</li>
          </ul>
          <div className="flex gap-5">
            <button
              onClick={handleSubmit}
              className=" border border-primary px-5 py-2 text-primary rounded-md flex items-center gap-2 hover:bg-primary hover:text-white duration-300"
            >
              <FaEdit />
              Edit
            </button>
            <Link
              to="/booking/submit"
              className="bg-primary text-white px-5 py-2 rounded-md hover:opacity-50 duration-300"
            >
              Submit
            </Link>
          </div>
        </div>
      )}{" "}
    </>
  );
}
