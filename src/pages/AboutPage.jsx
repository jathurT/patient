import { AboutUs, Doctor } from "../assets/index";
export default function AboutPage() {
  return (
    <>
      <section className="w-full max-w-screen-xl m-auto grid grid-cols-1 lg:grid-cols-2  gap-10 mt-[120px] xl:mt-[150px] px-5 ">
        <img src={AboutUs} alt="" className=" rounded-2xl" />

        <div className="flex justify-center ml-10  flex-col gap-5 lg:items-start items-center ">
          <div className="flex flex-col gap-5">
            <h2 className=" text-4xl font-bold sm:text-center lg:text-start">
              What you should know
            </h2>
          </div>

          <p className="sm:text-center leading-6 lg:text-start ">
            Welcome to our "About" page! At DN Dental Clinic, we are dedicated
            to providing high-quality dental care in a comfortable and friendly
            environment. Our experienced team prioritizes patient satisfaction
            and continuous education to stay updated with the latest
            advancements in dental technology. Here, you can learn about our
            range of services, from routine check-ups to advanced cosmetic
            treatments, and discover our commitment to making dental care
            accessible for everyone. We look forward to helping you achieve a
            healthy, beautiful smile!
          </p>
        </div>
      </section>

      <section className="bg-primary mt-32">
        <div className="w-full max-w-screen-xl m-auto grid grid-cols-1 lg:grid-cols-2  lg:gap-20 px-5  ">
          <div className=" flex flex-col gap-10 justify-center py-20">
            <h1 className="text-5xl font-bold text-white ">
              Message from Our Doctor
            </h1>
            <p className="text-white leading-6">
              Welcome to DN Dental Clinic! As your dedicated dental care
              provider, my primary goal is to ensure that every patient feels
              comfortable, informed, and confident in their dental health. We
              utilize the latest technology and techniques to deliver
              high-quality treatments, whether you need a routine check-up or
              specialized procedures. Our friendly staff is committed to
              creating a warm and welcoming environment, guiding you through
              every step of your dental journey. Thank you for trusting us with
              your care; together, let’s achieve a healthy, beautiful smile that
              you can be proud of!
            </p>
            <p className="text-white">— Umashankar, DN Dental Clinic</p>
          </div>
          <div className="flex justify-center  relative">
            <img src={Doctor} alt="" className=" lg:absolute lg:bottom-0 " />
          </div>
        </div>
      </section>
    </>
  );
}
