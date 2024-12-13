import { AboutUs, Doctor } from "../assets/index";
export default function AboutPage() {
  return (
    <>
      <section className="w-full max-w-screen-xl m-auto grid grid-cols-1 lg:grid-cols-2  gap-10 mt-[120px] xl:mt-[150px] px-5 ">
        <img src={AboutUs} alt="" className=" rounded-2xl" />

        <div className="flex flex-col gap-5 lg:items-start items-center ">
          <div className="flex flex-col gap-5">
            <h1 className=" font-bold text-2xl sm:text-center lg:text-start">
              About us
            </h1>
            <h2 className=" text-4xl sm:text-center lg:text-start">
              What you should know
            </h2>
          </div>

          <p className="sm:text-center lg:text-start">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </section>

      <section className="bg-primary mt-32">
        <div className="w-full max-w-screen-xl m-auto grid grid-cols-1 lg:grid-cols-2  lg:gap-20 px-5  ">
          <div className=" flex flex-col gap-10 justify-center py-20">
            <h1 className="text-5xl font-bold text-white ">
              Message from Our Doctor
            </h1>
            <p className="text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="flex justify-center  relative">
            <img src={Doctor} alt="" className=" lg:absolute lg:bottom-0 " />
          </div>
        </div>
      </section>
    </>
  );
}
