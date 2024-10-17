import { CheckCircleIcon } from "@heroicons/react/24/solid"; // Correct import path for Heroicons v2

export default function SuccessMessage() {
  return (
    <div className="fixed flex items-center justify-center h-screen w-full z-30">
      <div className=" bg-gradient-to-r from-teal-400 to-green-500 p-6 rounded-lg shadow-lg max-w-lg mx-auto text-center transition-all duration-300 ease-in-out transform ">
        {/* Success icon */}
        <div className="flex justify-center mb-4 animate-bounce">
          {/* HeroIcons icon */}
          <CheckCircleIcon className="h-12 w-12 text-white" />{" "}
          {/* HeroIcons icon */}
        </div>

        {/* Success Text */}
        <h3 className="text-3xl font-bold mb-2 text-white">
          Feedback Submitted
        </h3>
        <p className="text-white text-lg">
          Thank you for your valuable feedback!
        </p>
      </div>
    </div>
  );
}
