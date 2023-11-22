import { NavLink, Outlet } from "react-router-dom";
//import Navbar from "../../Shere/Navbar";
import { MdOutlineMarkEmailRead } from "react-icons/md";

import { BsCart4 } from "react-icons/bs";
import {   FaBook, FaCarAlt, FaHistory, FaHome,  FaList, FaUser, FaUtensils} from "react-icons/fa";
import useAdmin from "../../../Hooks/useAdmin";
import useCard from "../../../Hooks/useCard";
import useAuth from "../../../Hooks/useAuth";
const Dashboard = () => {
    const [cart]=useCard()
    const {user,logOut}=useAuth()
    const logOutButton=()=>{
        logOut()
        .then(()=>{})
        .catch(error=>{console.log(error)})
      }
   // const isAdmin =false
   const [isAdmin]=useAdmin()
    return (
        <div>
          
     
        <div className="flex"  >
            <div className="w-64 bg-orange-300 min-h-screen ">
                <h1 className="my-3 text-center shadow-2xl shadow-yellow-200 text-xl mx-4 bg-emerald-400 text-white rounded-ld">DASHBOARD MENU</h1>
                <ul>
               {user && !isAdmin && <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/profile'><FaHome />Profile</NavLink>}
               {user && isAdmin &&  <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/adminHome'><FaHome />Admin Home</NavLink>}
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/cart'><BsCart4  />My Cart +{cart.length}</NavLink>
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/manageBooking'><FaBook />Manage Booking</NavLink>
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/paymentHistory'><FaHistory/>Payment History</NavLink>
               
                {isAdmin ?<> 
                    <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/manageItem'><FaList />Manage Item</NavLink>
                
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/addItems'><FaUtensils  />ADD ITEMS</NavLink>
                
                
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/allUsers'><FaUser/>ALL Users</NavLink>
               
                
                <div className="divider"></div>
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/'><FaHome />Home</NavLink>
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/order/salad'><FaCarAlt />Order</NavLink>
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/contact'><MdOutlineMarkEmailRead /> Contact</NavLink>
                 </>:<> 
                <div className="divider"></div>
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/'><FaHome />Home</NavLink>
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/order/salad'><FaCarAlt />Order</NavLink>
                <NavLink className='w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/contact'><MdOutlineMarkEmailRead /> Contact</NavLink>
                </> }

                <NavLink
  onClick={logOutButton}
  className={({ isActive, isPending }) =>
    isPending ? "" : isActive ? 'w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info': "'w-3/4 p-2 my-3 mx-6 text-justify   btn btn-outline btn-sm btn-info ' to='/dashboard/profile'"
  }
>
LogOut 
</NavLink>
                </ul> 
               
            </div>
            <div className="flex-1 bg-green-300">
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;