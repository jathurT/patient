import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
export default function FeedbackForm({ onClose, onFormSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const FeedbackRef = useRef();

  const closeForm = (e) => {
    if (e.target === FeedbackRef.current) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = { name, email, rating, comments };
    console.log(feedbackData);
    try {
      const response = await axiosInstance.post(
        "/feedback/submit",
        feedbackData
      );

      if (response.status === 201) {
        console.log("Feedback submitted successfully", feedbackData);
        onFormSubmit(); // Trigger the form submit handler to show success message and close modal
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error(
        "Error submitting feedback:",
        error.response.data.error ?? null
      );
    } finally {
      onClose();
    }
  };

  return (
    <div
      ref={FeedbackRef}
      onClick={closeForm}
      className="bg-black bg-opacity-50 backdrop-blur-sm fixed flex items-center justify-center h-screen w-full z-30 "
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white min-w-[350px] lg:min-w-[400px] mx-auto mt-10 p-6  shadow-lg rounded-lg "
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Feedback Form</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="rating"
          >
            Rating:
          </label>
          <div className="inline-flex space-x-3">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="hidden"
                  />
                  <FaStar
                    size={30}
                    className="cursor-pointer text-2xl"
                    color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="comment"
          >
            Add Comment:
          </label>
          <textarea
            id="comment"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>

        <div className="text-center flex justify-end gap-5">
          <button
            onClick={onClose}
            className="text-blue-500 hover:text-gray-400 duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" py-2 px-5 bg-primary text-white font-semibold rounded hover:bg-green-800 duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
