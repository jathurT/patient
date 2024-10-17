export default function Scedule() {
  return (
    <>
      <div className="px-1 py-2 sm:px-3 rounded-lg shadow-md bg-white border-l-2 border-l-primary text-sm sm:text-base uppercase">
        <div className="flex gap-3 sm:gap-10 ">
          <div className="flex flex-col gap-1">
            <div className="  text-gray-500 uppercase">august 13, 2014 </div>
            <div className=" text-teal-600">tue 09:30 pm </div>
          </div>
          <div className="flex flex-col gap-1 items-center w-32 sm:w-auto ">
            <div className=" text-gray-500 text-center ">
              active appointment
            </div>
            <div className="  text-primary">04</div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-10 md:items-center">
            <button className="w-[85px] md:h-10 md:py-3 py-1 bg-primary text-white rounded-lg  text-xs">
              Book
            </button>
            <p className="w-[85px]  text-center md:h-10 py-1 md:py-3  text-red-500 rounded-lg text-xs bg-red-100 ">
              Unavailable
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
