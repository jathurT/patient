import { Link } from "react-router-dom";
import { HeroImage } from "../assets/index";
export default function Hero() {
  return (
    <>
      <section className="w-full  max-w-screen-xl  m-auto grid grid-cols-1 lg:grid-cols-2  gap-10 lg:gap-0  ">
        <div className="flex flex-col gap-3 lg:justify-center lg:items-start   sm:items-center pt-10 ">
          <h1 className="sm:text-6xl text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#007E85] to-[#5be066]">
            DN Dental Clinic :
          </h1>

          <h1 className="sm:text-6xl text-5xl font-bold text-text-headers">
            A Casual Meetup for
          </h1>

          <h1 className="sm:text-6xl text-5xl font-bold text-text-headers">
            Dental Professionals
          </h1>

          <p className="mt-5">Please register to be a part of the event.</p>
          <Link
            to="/booking"
            className="bg-primary text-white px-8 py-2 text-xl font-semibold hover:opacity-80  transition-all rounded-lg  text-center"
          >
            Book Now
          </Link>
        </div>

        <div className="flex justify-center px-10 ">
          <img src={HeroImage} alt="" />
        </div>
      </section>
    </>
  );
}
