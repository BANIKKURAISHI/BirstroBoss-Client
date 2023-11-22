import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import img1 from "../../assets/home/slide1.jpg";
import img2 from "../../assets/home/slide2.jpg";
import img3 from "../../assets/home/slide3.jpg";
import img4 from "../../assets/home/slide4.jpg";
import img5 from "../../assets/home/slide5.jpg";
import SectionTitle from "../Section title/SectionTitle";
const Swp = () => {
  return (
    <section>
        <SectionTitle
         subHeading={'from 11am to 10 pm'}
         heading={'Order online'}
        >
       
        </SectionTitle>

        <Swiper
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={20}
      grabCursor={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper my-10"
    >
      <SwiperSlide>
        <img src={img1} className="w-96 h-80" alt="" />
        <h1 className="mx-20 text-4xl  uppercase text-white -mt-16">Salad</h1>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} className="w-96 h-80" alt="" />
        <h1 className="mx-20 text-4xl uppercase text-white -mt-16">pizza</h1>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} className="w-96 h-80" alt="" />
        <h1 className="mx-20 text-4xl uppercase text-white -mt-16">Soups</h1>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img4} className="w-96 h-80" alt="" />
        <h1 className="mx-20 text-4xl uppercase text-white -mt-16">desserts</h1>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img5} className="w-96 h-80" alt="" />
        <h1 className="mx-20 text-4xl uppercase text-white -mt-16">Salad</h1>
      </SwiperSlide>
    </Swiper>
   
    </section>
   
  );
};

export default Swp;
