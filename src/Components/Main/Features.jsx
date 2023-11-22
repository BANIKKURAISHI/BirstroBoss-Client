
import SectionTitle from './../Section title/SectionTitle';
import feature from '../../assets/home/featured.jpg'
import '../Main/Feature.css'
import { Link } from "react-router-dom";
const Features = () => {
    return (
        <div className='features-item bg-fixed text-white pt-10 my-20'>
           <SectionTitle  
      
           subHeading={'Check it out '}
           heading={'Features Items'}
          >
        </SectionTitle>
        <div className='md:flex bg-slate-400 bg-opacity-60 items-center pb-20 pt-12 px-36'>
                <div>
                    <img src={feature} alt="" />
                </div>
                <div className='ml-10'>
                    <p>Aug 20,2024</p>
                    <h1 className='uppercase'>Where can i get some food ?</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate dicta soluta vitae dignissimos explicabo quos quasi, ipsum, optio, velit animi cum enim ab doloremque dolor esse aspernatur iusto. Ipsa, rem!</p>
                    <Link to="/order" className="btn btn-outline border-0 border-b-4 mt-5">Order now</Link>
                </div>
        </div>
        </div>
    );
};

export default Features;