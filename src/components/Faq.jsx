import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Try3() {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section className="py-10 bg- sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
            </p>
          </div>

          <div className="max-w-8xl mx-auto mt-8 space-y-4 md:mt-16 ">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <button
                  type="button"
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold text-black">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight:
                      activeIndex === index
                        ? contentRefs.current[index]?.scrollHeight + "px"
                        : "0",
                  }}
                >
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p>
                      {faq.answer}
                      <a
                        href="#"
                        title=""
                        className="text-blue-600 transition-all duration-200 hover:underline"
                      >
                        aliqua dolor
                      </a>{" "}
                      do amet sint. Velit officia consequat duis enim velit
                      mollit.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-base mt-9">
            Didn’t find the answer you are looking for?{" "}
            <Link
              to="/contact"
              className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
            >
              Contact our support
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

const faqData = [
  {
    question: "How to create an account?",
    answer: "Amet minim mollit non deserunt ullamco est sit aliqua dolor.",
  },
  {
    question: "How can I make payment using Paypal?",
    answer: "Velit officia consequat duis enim velit mollit aliqua dolor.",
  },
  {
    question: "Can I cancel my plan?",
    answer: "Amet minim mollit non deserunt ullamco est sit aliqua dolor.",
  },
  {
    question: "How can I reach to support?",
    answer: "Velit officia consequat duis enim velit mollit aliqua dolor.",
  },
];
