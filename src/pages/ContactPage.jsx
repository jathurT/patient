import { ContactusBanner } from "../assets/index";
import ContactForm from "../components/ContactForm";
import Location from "../components/Location";
export default function ContactPage() {
  return (
    <>
      <section className="mt-[92px] ">
        <div className=" relative bg-slate-300">
          <div className=" absolute top-1/3 w-full text-primary text-5xl font-bold text-center">
            Contact us
          </div>
          <img
            src={ContactusBanner}
            alt="description of the image"
            className="h-[258px] w-full object-cover mx-auto bg-slate-500"
          />
        </div>
      </section>

      <section>
        <ContactForm />
      </section>

      <section className="mt-24">
        <Location />
      </section>
    </>
  );
}
