import SectionTitle from "./../Section title/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'



const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  return (
    <section className="my-20">
      <SectionTitle heading={"What our client say"} subHeading={"Testimonial"}>
        {" "}
      </SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="m-20 flex flex-col items-center mx-24 my-16">
              <Rating style={{ maxWidth: 180 }} value={item.rating} readOnly />
              <p className="mt-4">{item.details}</p>
              <h1 className="text-2xl text-orange-400">{item.name}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
