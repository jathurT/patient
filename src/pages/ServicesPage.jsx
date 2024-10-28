import { ServicesBanner } from "../assets/index";
import Faq from "../components/Faq";
import Services from "../components/Services";
import Try3 from "../components/Try3";

export default function ServicesPage() {
  return (
    <>
      <section className="mt-[92px] ">
        <div className=" relative bg-slate-300">
          <div className=" absolute top-1/3 w-full text-primary text-5xl font-bold text-center">
            Services we provide
          </div>
          <img
            src={ServicesBanner}
            alt="description of the image"
            className="h-[258px] w-full object-cover mx-auto bg-slate-500"
          />
        </div>
      </section>

      <section className="mt-24 px-5 ">
        <Services />
      </section>

      <section className=" mt-32 px-5">
        <Try3 />
      </section>
    </>
  );
}
