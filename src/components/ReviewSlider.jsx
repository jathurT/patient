import React from "react";
import Slider from "react-slick";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    review: "This is an amazing product! Highly recommended.",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Jane Smith",
    review: "Great service and excellent support. Very satisfied!",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Sam Wilson",
    review: "I love this app! It has made my life so much easier.",
    avatar: "https://via.placeholder.com/150",
  },
];

const ReviewSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    nextArrow: null, // Hides the next arrow
    prevArrow: null, // Hides the previous arrow
  };

  return (
    <>
      <section className=" px-5 flex flex-col gap-10">
        <h1 className=" font-semibold text-primary text-center text-3xl lg:text-4xl">
          Testimonial
        </h1>

        <div className="w-full lg:max-w-5xl mx-auto p-6">
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="p-6">
                <div className="text-center p-6 bg-white shadow-md rounded-lg">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                  <h3 className="mt-4 text-lg font-semibold">{review.name}</h3>
                  <p className="mt-2 text-gray-600">{review.review}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default ReviewSlider;
