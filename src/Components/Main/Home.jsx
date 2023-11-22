import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shere/Navbar";
import Footer from "../Shere/Footer";
import Carousel from './../Shere/Carousel';
import Swp from "../Shere/Swp";
import Popular from "../Section title/Popular";
import Features from "./Features";
import Testimonial from "./Testimonial";
import { Helmet } from "react-helmet-async";



const Home = () => {
    const location=useLocation()
    const hidden =location.pathname.includes('login')
    const hid =location.pathname.includes('singUp')
    return (
        <div>
            <Helmet>
                <title>Bistro boss || home</title>
            </Helmet>
           {hidden ||hid|| <Navbar></Navbar>}
           {hidden ||hid||  <Carousel></Carousel>}
         
          {hidden ||hid||  <Swp></Swp>}
          {hidden ||hid||  <Popular></Popular>}
          {hidden ||hid||  <Features></Features>}
          {hidden || hid||  <Testimonial ></Testimonial> }
         
         
           <Outlet></Outlet>
           {hidden ||hid||  <Footer></Footer>}
        </div>
    );
};

export default Home;