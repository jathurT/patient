import Doctor from "../components/Doctor";
import Schedule from "../components/Schedule ";
import Loader from "../components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      setError(null); // Reset any previous error

      try {
        const response = await axios.get(
          "http://localhost:8080/api/schedules/all"
        );
        setSchedules(response.data);
        console.log(response.data);
      } catch (err) {
        if (err.response) {
          // Server responded with a status code other than 2xx
          setError(
            `Server Error: ${err.response.status} - ${
              err.response.data.message || "Something went wrong"
            }`
          );
        } else if (err.request) {
          // Request was made but no response received
          setError(
            "Network Error: Unable to fetch schedule data. Please check your internet connection."
          );
        } else {
          // Other errors (e.g., setup issue)
          setError(`Error: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-[92px] lg:h-[1000px] md:h-[1000px] h-[1300px]">
      <div className="h-[258px] w-full flex justify-center bg-primary relative px-5  ">
        <div className=" absolute top-1/4 md:top-1/3 xl:max-w-screen-xl lg:max-w-screen-lg lg:w-full flex flex-col gap-10 ">
          <Doctor />
          <div className="flex flex-col gap-5">
            <h1 className=" text-black text-2xl   ">Schedule an Appointment</h1>
            <div className="flex flex-col gap-1">
              {schedules.map((schedule) => (
                <Schedule key={schedule.id} schedule={schedule} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
