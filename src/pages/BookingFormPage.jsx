import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

import BookingForm from "../components/BookingForm";
import Doctor from "../components/Doctor";
import Schedule from "../components/Schedule";
import Loader from "../components/Loader";

export default function BookingFormPage() {
  const { id } = useParams();
  const intId = parseInt(id, 10);
  const [schedule, setSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axiosInstance.get(`/schedules/${intId}`);
        if (response.status === 200) {
          setSchedule(response.data);
        }
      } catch (err) {
        if (err.response.data.details.error && err.response.status === 404) {
          setError(err.response.data.details.error);
        } else if (
          err.response.data.details.error &&
          err.response.status === 401
        ) {
          setError(err.response.data.details.error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [intId]);

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

  // Handle case where schedule is not available
  if (!schedule || schedule.status !== "AVAILABLE") {
    return <Navigate to="/booking" />;
  }

  return (
    <div className="mt-[92px] lg:h-[1000px] md:h-[1000px] h-[1300px]">
      <div className="h-[258px] w-full flex justify-center bg-primary relative px-5  ">
        <div className=" absolute top-1/4 md:top-1/3 xl:max-w-screen-xl lg:max-w-screen-lg lg:w-full flex flex-col gap-5 ">
          <Doctor />
          <Schedule schedule={schedule} />
          {schedule.status === "AVAILABLE" ? (
            <>
              <BookingForm
                scheduleId={schedule.id}
                setIsLoading={setIsLoading}
                setError={setError}
              />
            </>
          ) : (
            <>
              <h1 className="text-center text-2xl text-red-500 bg-white p-5">
                This schedule is not available
              </h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
