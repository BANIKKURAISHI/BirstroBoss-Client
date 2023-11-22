import { useState } from "react";
import Footer from "../Components/Shere/Footer";
import Navbar from "../Components/Shere/Navbar";
import Cover from "../Components/Shere/cover/Cover";
import img from "../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../Hooks/useMenu";
import {useParams } from 'react-router-dom'
import OrdersTab from "./OrdersTab";
import { Helmet } from "react-helmet-async";
const Order = () => {
   
    const [menu]=useMenu()
    const {category}=useParams()
    //console.log(category.split(' ')[0])
    console.log(category)
   
    const categoryItem =['salad','pizza','soup','dessert','drinks','offered']
    const indexofItem =categoryItem.indexOf(category)
    const [indexTab,setIndexTab]=useState(indexofItem)

     const desserts=menu.filter(data=>data.category==='dessert')
     const pizza=menu.filter(data=>data.category==='pizza')
     const soup=menu.filter(data=>data.category==='soup')
     const drinks=menu.filter(data=>data.category==='drinks')
     const salad=menu.filter(data=>data.category==='salad')
     const offered=menu.filter(data=>data.category==='offered')
   
  return (
    <div>
         <Helmet>
            <title>Bistro boss || order</title>
            </Helmet>
      <Navbar></Navbar>
      <Cover img={img} title={"Order Food"}></Cover>
      {/* <div className="tabs tabs-lifted my-20">
        <a className="tab">Tab 1</a>
        <a className="tab tab-active">Tab 2</a>
        <a className="tab">Tab 3</a>
      </div> */}
<Tabs defaultIndex={indexTab} onSelect={(index) =>setIndexTab(index)}>
  <TabList>
    <Tab> Salad</Tab>
    <Tab> Pizza</Tab>
    <Tab> Soup</Tab>
    <Tab> Dessert</Tab>
    <Tab>Drinks </Tab>
    <Tab>Offered </Tab>
  </TabList>
  <TabPanel>
    <OrdersTab items={salad}></OrdersTab>
   
  </TabPanel>
  <TabPanel>
  <OrdersTab items={desserts}></OrdersTab>
  </TabPanel>
  <TabPanel>
  <OrdersTab items={pizza}></OrdersTab>
  </TabPanel>
  <TabPanel>
  <OrdersTab items={soup}></OrdersTab>
  </TabPanel>
  <TabPanel>
 
  <OrdersTab items={drinks}></OrdersTab>
   
  </TabPanel>
  <TabPanel>
 
 <OrdersTab items={offered}></OrdersTab>
  
 </TabPanel>
</Tabs>

      <Footer></Footer>
    </div>
  );
};

export default Order;
