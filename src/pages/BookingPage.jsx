import Doctor from "../components/Doctor";
import Schedule from "../components/Schedule ";
import { dummySchedule } from "../data/index";
import ContactForm from "../components/ContactForm";
export default function BookingPage() {
  return (
    <div className="mt-[92px] lg:h-[1000px] md:h-[1000px] h-[1300px]">
      <div className="h-[258px] w-full flex justify-center bg-primary relative px-5  ">
        <div className=" absolute top-1/4 md:top-1/3 xl:max-w-screen-xl lg:max-w-screen-lg lg:w-full flex flex-col gap-10 ">
          <Doctor />
          <div className="flex flex-col gap-5">
            <h1 className=" text-black text-2xl   ">Schedule an Appointment</h1>
            <div className="flex flex-col gap-1">
              {dummySchedule.map((schedule) => (
                <Schedule key={schedule.id} schedule={schedule} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
