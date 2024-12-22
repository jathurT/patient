import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { z } from "zod";
import { FaEdit } from "react-icons/fa";
// Define validation schema with Zod
const bookingSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name should be less than 20 characters"),
  nic: z
    .string()
    .regex(/^(\d{9}[VX]|[1-9]\d{11})$/, "Please enter a valid NIC number")
    .min(10, "NIC number should be 10 characters")
    .max(12, "NIC number should be 12 characters"),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Contact number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
});

export default function BookingForm({ scheduleId, setIsLoading, setError }) {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    contactNumber: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const toggleBookingFormEdit = (e) => {
    setErrors({});
    e.preventDefault();
    const validationResult = bookingSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return;
    } else {
      setIsEdit((prev) => !prev);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data with Zod
    const validationResult = bookingSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      const now = new Date();
      const sriLankaTimeOffset = now.getTime() + 5.5 * 60 * 60 * 1000;
      const sriLankaTime = new Date(sriLankaTimeOffset);
      const sriLankaTimeISO = sriLankaTime.toISOString().slice(0, 19);

      const response = await axiosInstance.post("/bookings/create", {
        ...formData,
        scheduleId,
        dateTime: sriLankaTimeISO,
      });

      if (response.status === 201) {
        navigate(`/booking/submit/${response.data.referenceId}`);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isEdit && (
        <div className="flex justify-center py-10 px-5 bg-white shadow-lg">
          <div className="xl:px-8 rounded-lg w-full max-w-screen-lg">
            <>
              <h2 className="text-center text-2xl font-semibold mb-10">
                Consult with Our Experts
              </h2>

              <form
                onSubmit={toggleBookingFormEdit}
                className="flex flex-col md:gap-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="nic"
                      className="block text-sm font-medium text-gray-700"
                    >
                      NIC
                    </label>
                    <input
                      id="nic"
                      name="nic"
                      type="text"
                      value={formData.nic}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                    />
                    {errors.nic && (
                      <p className="text-red-500 text-sm">{errors.nic}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="contactNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Number
                    </label>
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="text"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                    />
                    {errors.contactNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.contactNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 p-2"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-700 focus:outline-none focus:ring-teal-500"
                  >
                    countinue
                  </button>
                </div>
              </form>
            </>
          </div>
        </div>
      )}
      {isEdit && (
        <div className=" w-full p-5 bg-white rounded-2xl">
          <ul className="flex flex-col gap-5 bg-white ">
            <h2 className=" text-2xl font-semibold">Confirm Details</h2>
            <li>
              Name: <span className=" font-semibold">{formData.name}</span>
            </li>
            <li>
              NIC: <span className=" font-semibold">{formData.nic}</span>
            </li>
            <li>
              Contact Number:{" "}
              <span className=" font-semibold">{formData.contactNumber}</span>
            </li>
            <li>
              Email: <span className=" font-semibold">{formData.email}</span>
            </li>

            <li>
              Address:{" "}
              <span className=" font-semibold">{formData.address}</span>
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
              Confirm & Book
            </button>
          </div>
        </div>
      )}{" "}
    </>
  );
}
