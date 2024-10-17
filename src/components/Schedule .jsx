import { Link, useParams } from "react-router-dom";
import { CiBookmark, CiLock } from "react-icons/ci";

export default function Schedule({ schedule }) {
  const scheduleTheme = {
    Available: "text-green-500 bg-green-100",
    Unavailable: "text-red-500 bg-red-100",
    Closed: "text-purple-500 bg-purple-100",
  };
  return (
    <>
      <div className="px-1 py-2 sm:px-3 rounded-lg shadow-md bg-white border-l-2 border-l-primary text-sm sm:text-base uppercase">
        <div className="flex gap-3  sm:gap-10 max-w-2xl ">
          <div className="flex flex-col gap-1 w-[118px] sm:w-[158px]">
            <div className="  text-gray-500 uppercase  text-xs sm:text-base">
              {schedule.date}
            </div>
            <div className=" text-teal-600 ">
              {schedule.day_of_week.slice(0, 3)} {schedule.time}
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center w-28 sm:w-auto   ">
            <div className=" text-gray-500 text-center ">
              active appointment
            </div>
            <div className="  text-primary">{schedule.active_appointment}</div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-10 md:items-center ">
            <Link
              to={`${
                schedule.status == "Available" ? `/booking/${schedule.id}` : "#"
              }`}
              disabled={schedule.status == "Unavailable"}
              className="w-[85px] md:h-10 md:py-3 py-1 bg-primary text-white rounded-lg    flex items-center justify-center gap-1"
            >
              {schedule.status == "Available" ? <CiBookmark /> : <CiLock />}

              <p className="text-xs">Book</p>
            </Link>
            <p
              className={`w-[85px]  text-center md:h-10 py-1 md:py-3   rounded-lg text-xs ${
                scheduleTheme[schedule.status]
              }`}
            >
              {schedule.status}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
