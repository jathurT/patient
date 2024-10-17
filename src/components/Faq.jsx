export default function Faq() {
  const faqs = [
    {
      question: "How do I get started?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
    },
    {
      question: "How do I get started?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
    },
    {
      question: "How do I get started?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
    },
    {
      question: "How do I get started?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
    },
    {
      question: "How do I get started?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
    },
    {
      question: "How do I get started?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
    },
    {
      question: "How do I get started?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
    },
    {
      question: "How do I get started?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
    },
    {
      question: "How do I get started?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et, mauris, in  sed. ",
    },
  ];

  return (
    <>
      <div className=" flex flex-col gap-5 justify-center items-center ">
        <h1 className=" font-bold text-5xl">FAQ</h1>
        <p className="text-gray-600 max-w-96 text-center">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics{" "}
        </p>
      </div>

      <div className="w-full  max-w-screen-xl  m-auto grid  md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="flex gap-5 bg-white rounded-lg p-6 relative"
          >
            <div className="-400 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            <div className=" flex flex-col gap-5 ">
              <h2 className="text-xl font-semibold text-gray-800">
                {faq.question}
              </h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
