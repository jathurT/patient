import { Pattern_down, Pattern_up } from "../assets/index";

export default function FeedbackBanner({ setShowForm }) {
  return (
    <>
      <div className="bg-primary text-white text-center py-3 relative w-full h-[500px] flex flex-col items-center justify-center gap-3">
        <h1 className=" text-5xl font-semibold ">Add your valuable</h1>
        <h1 className=" text-5xl font-semibold">feedback</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-btn-color text-black  px-10 py-4 mt-5 z-20"
        >
          Add Feedback
        </button>

        <img src={Pattern_down} alt="" className=" absolute left-0 bottom-0" />
        <img src={Pattern_up} alt="" className=" absolute right-0 top-0" />
      </div>
    </>
  );
}
