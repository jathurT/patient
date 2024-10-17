export default function Location() {
  return (
    <section className="container mx-auto text-center px-4 ">
      {/* Location Heading */}
      <h2 className="font-semibold text-primary text-center text-3xl lg:text-4xl">
        Location
      </h2>
      <p className="text-gray-600 mb-8">
        No. 24, Galle Road, Colombo 03, Western Province, Sri Lanka
      </p>

      {/* Google Map Embed */}
      <div className="flex justify-center">
        <div className="w-full lg:max-w-screen-xl md: max-w-screen-lg transform transition duration-500  hover:shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.149174133191!2d79.88011687448248!3d6.872723119007676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b9d15e8a9f5%3A0x1893d6e9373bb254!2sKandy%20-%20Nugegoda!5e0!3m2!1sen!2slk!4v1727725194457!5m2!1sen!2slk"
            width="100%"
            height="500"
            allowFullScreen=""
            loading="lazy"
            className="border-0 shadow-lg rounded-lg w-full xl:h-[500px] h-96"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
