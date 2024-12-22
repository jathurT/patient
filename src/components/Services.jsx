import { Link } from "react-router-dom";

import { services } from "../data/index";

export default function Services() {
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
          <h2 className="text-xl  px-5 pt-1 font-semibold mt-5">
            {service.name}
          </h2>
          <p className="text-gray-500 px-5 pt-3 mt-2">{service.description}</p>
        </div>
      ))}
    </div>
  );
}
