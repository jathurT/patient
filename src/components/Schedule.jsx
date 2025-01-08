import { Link } from "react-router-dom";
import { CiBookmark, CiLock } from "react-icons/ci";

export default function Schedule({ schedule }) {
  const scheduleTheme = {
    statusbarStyle: {
      AVAILABLE: "text-green-500 bg-green-100",
      UNAVAILABLE: "text-red-500 bg-red-100",
      FULL: "text-purple-500 bg-purple-100",
      CANCELLED: "text-yellow-600 bg-yellow-100",
      ON_GOING: "text-blue-500 bg-blue-100",
      FINISHED: "text-gray-600 bg-gray-100",
    },
    linkStyle: {
      AVAILABLE: "cursor-pointer hover:opacity-50 duration-300",
      UNAVAILABLE: "cursor-not-allowed",
      FULL: "cursor-not-allowed",
      CANCELLED: "cursor-not-allowed",
      ON_GOING: "cursor-not-allowed",
      FINISHED: "cursor-not-allowed",
    },
    bookingButtonLogo: {
      AVAILABLE: <CiBookmark />,
      UNAVAILABLE: <CiLock />,
      FULL: <CiLock />,
      CANCELLED: <CiLock />,
      ON_GOING: <CiLock />,
      FINISHED: <CiLock />,
    },
    link: {
      AVAILABLE: `/booking/${schedule.id}`,
      UNAVAILABLE: "/booking",
      FULL: "/booking",
      CANCELLED: "/booking",
      ON_GOING: "/booking",
      FINISHED: "/booking",
    },
  };
  return (
    <>
      <div className="px-1 py-2 sm:px-3 rounded-lg  shadow-md bg-white border-l-2 border-l-primary text-sm sm:text-base uppercase">
        <div className="flex gap-3  sm:gap-10 max-w-2xl ">
          <div className="flex flex-col gap-1 w-[118px] sm:w-[158px]">
            <div className="  text-gray-500 uppercase  text-xs sm:text-base">
              {schedule.date}
            </div>
            <div className=" text-teal-600 ">
              {schedule.dayOfWeek.slice(0, 3)} {schedule.startTime.slice(0, 5)}
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center w-28 sm:w-auto   ">
            <div className=" text-gray-500 text-center ">
              active appointment
            </div>
            <div className="  text-primary">{schedule.bookings.length}</div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-10 md:items-center ">
            <Link
              to={`${scheduleTheme.link[schedule.status]}`}
              className={`w-[85px] md:h-10 md:py-3 py-1 bg-primary text-white rounded-lg 
                          flex items-center justify-center gap-1 
                          ${scheduleTheme.linkStyle[schedule.status]} `}
            >
              {scheduleTheme.bookingButtonLogo[schedule.status]}

              <p className="text-xs">Book</p>
            </Link>
            <p
              className={`w-[85px]  text-center md:h-10 py-1 md:py-3   rounded-lg text-xs ${
                scheduleTheme.statusbarStyle[schedule.status]
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
