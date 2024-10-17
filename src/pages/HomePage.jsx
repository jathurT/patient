import FeedbackBanner from "../components/FeedbackBanner";
import FeedbackForm from "../components/FeedbackForm";
import Hero from "../components/Hero";
import ResultBar from "../components/ResultBar";
import Services from "../components/Services";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Location from "../components/Location";
import SuccessMessage from "../components/SuccessMessage";
export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitted(true); // Set form submission state to true
    // Close the form modal

    // Automatically hide the success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false); // Reset the state to show the form again
    }, 2000);
  };

  return (
    <>
      <section className="mt-24 px-5 ">
        <Hero />
      </section>

      <section className="bg-primary px-5 mt-24">
        <ResultBar />
      </section>

      <section className="mt-24 px-5 flex flex-col gap-20">
        <h1 className=" font-semibold text-primary text-center text-3xl lg:text-4xl">
          Services we provide{" "}
        </h1>
        <Services />
      </section>

      <section className="mt-24">
        <FeedbackBanner setShowForm={setShowForm} />
      </section>

      {isSubmitted && (
        <SuccessMessage /> // Show success message component if the form is submitted
      )}

      {showForm && (
        <FeedbackForm
          onClose={() => setShowForm(false)}
          onFormSubmit={handleFormSubmit}
        />
      )}

      {/* <section className="  flex items-center justify-center mt-24">
        <ReviewSlider />
      </section> */}

      <section className="mt-24">
        <Location />
      </section>
    </>
  );
}
