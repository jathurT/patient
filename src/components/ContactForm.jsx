import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
export default function ContactForm() {
  // Define separate state for each form input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const formData = { name, email, contactNumber, subject, message };
    console.log("Form Data Submitted:", formData);
    try {
      const response = await axiosInstance.post("/contacts/submit", {
        ...formData,
      });

      if (response.status === 200) {
        console.log("Feedback submitted successfully", formData);
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.log("Error submitting feedback:", error.response);
    } finally {
      setName("");
      setEmail("");
      setContactNumber("");
      setSubject("");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-5 bg-white ">
      <div className="bg-white p-8 rounded-lg  w-full  max-w-screen-lg">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Get In Touch
        </h2>

        <form onSubmit={handleSubmit}>
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
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={subject}
                required
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter your subject"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-700 focus:outline-none  focus:ring-teal-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
