import { Hhro } from "../assets/index";
import { Link } from "react-router-dom";
import { services } from "../data/index";
export default function Services() {
  // const services = [
  //   {
  //     name: "General Checkup",
  //     image: Hhro,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
  //     link: "/services",
  //   },
  //   {
  //     name: "General Checkup",
  //     image: Hhro,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
  //     link: "/services",
  //   },
  //   {
  //     name: "General Checkup",
  //     image: Hhro,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
  //     link: "/services",
  //   },
  //   {
  //     name: "General Checkup",
  //     image: Hhro,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
  //     link: "/services",
  //   },
  //   {
  //     name: "General Checkup",
  //     image: Hhro,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
  //     link: "/services",
  //   },
  //   {
  //     name: "General Checkup",
  //     image: Hhro,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
  //     link: "/services",
  //   },
  // ];
  return (
    <div className="w-full  max-w-screen-xl  m-auto grid  md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex flex-col bg-white aspect-3/4 rounded-3xl  p-5 relative shadow-lg border border-gray-200 "
        >
          <img
            src={service.image}
            alt=""
            className="aspect-3/2 bg-slate-400 rounded-xl object-cover"
          />
          <h2 className="text-xl font-semibold mt-5">{service.name}</h2>
          <p className="text-gray-500 mt-2">{service.description}</p>
          <Link
            to={service.link}
            className=" text-primary absolute bottom-10 flex gap-1 font-semibold"
          >
            Learn more{" "}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}
