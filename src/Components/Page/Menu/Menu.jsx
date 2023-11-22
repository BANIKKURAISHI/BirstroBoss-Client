import { Helmet } from "react-helmet-async";
import Cover from "../../Shere/cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg"
import dessertImg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import soupImg from "../../../assets/menu/soup-bg.jpg"

import Navbar from "../../Shere/Navbar";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../Section title/SectionTitle";

import MenuCategory from "../../Section title/MenuCategory";
import Footer from "../../Shere/Footer";
const Menu = () => {
    const [menu]=useMenu()
     const desserts=menu.filter(data=>data.category==='dessert')
     const pizza=menu.filter(data=>data.category==='pizza')
     const soup=menu.filter(data=>data.category==='soup')
     const offered=menu.filter(data=>data.category==='offered')
     const salad=menu.filter(data=>data.category==='salad')
     const drinks=menu.filter(data=>data.category==='drinks')
    return (
        <div>
            <Helmet>
            <title>Bistro boss || menu</title>
            </Helmet>
            <Navbar></Navbar>
            <Cover img={menuImg} title={'our menu'}></Cover>
          <SectionTitle subHeading={'offer items'} heading={'Todays offer'}></SectionTitle>
           
           <MenuCategory items={desserts} coverImg={dessertImg} title={'dessert'}></MenuCategory>
           <MenuCategory items={pizza} coverImg={pizzaImg} title={'pizza'}></MenuCategory>
           <MenuCategory items={salad} coverImg={saladImg} title={'salad'}></MenuCategory>
           <MenuCategory items={soup} coverImg={soupImg} title={'soup'}></MenuCategory>
           <MenuCategory items={drinks} coverImg={soupImg} title={'drinks'}></MenuCategory>
           <MenuCategory items={offered} coverImg={dessertImg} title={'offered'}></MenuCategory>
           <Footer></Footer>
        </div>
    );
};

export default Menu;
