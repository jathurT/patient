export default function ResultBar() {
  const data = [
    { value: "99%", title: "Satisfaction rate" },
    { value: "15k", title: "Online Patients" },
    { value: "12k", title: "Patients Recovered" },
    { value: "240%", title: "Company growth" },
  ];

  return (
    <div className="w-full max-w-screen-xl m-auto text-white flex flex-col items-center pt-10 pb-20 gap-20 ">
      <h2 className="text-white text-3xl lg:text-4xl font-semibold">
        Our results in numbers
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10  w-full">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 text-center "
          >
            <h2 className="text-3xl lg:text-4xl font-bold">{item.value}</h2>
            <p className="font-semibold text-2xl lg:text-2xl">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
