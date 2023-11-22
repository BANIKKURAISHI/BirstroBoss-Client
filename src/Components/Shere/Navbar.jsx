import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from 'react';

import { FaCartPlus } from 'react-icons/fa';
import useCard from "../../Hooks/useCard";


const Navbar = () => {
  const {user,logOut}=useContext(AuthContext)
const [cart]=useCard()

  const logOutButton=()=>{
    logOut()
    .then(()=>{})
    .catch(error=>{console.log(error)})
  }

    const nav=<>
    <NavLink
  to="/"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
Home
</NavLink>
    <NavLink
  to="/menu"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "mx-2" : "mx-2"
  }
>
Menu 
</NavLink>
    <NavLink
  to="/order/salad"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "mx-2" : "mx-2"
  }
>
Order
</NavLink>
<NavLink to='/dashboard' className="btn bg-black">
<FaCartPlus className="w-10 h-10 text-white" />
  <div className="badge badge-secondary">+{cart.length}</div>
</NavLink>


{user?.email ? <>
  <img className="h-16 w-16 rounded-full" src={user?.photoUrl} alt="" />
  <span>{user?.displayName}</span>
  
    <NavLink
  onClick={logOutButton}
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "mx-2" : "mx-2"
  }
>
LogOut 
</NavLink>
</>:<div>
 
    <NavLink
  to="/login"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "mx-2" : "mx-2"
  }
>
Login
</NavLink>
    <NavLink
  to="/singUp"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "mx-2" : "mx-2"
  }
>
Registration
</NavLink> 
    </div>}</>
    return (
        <div className="  ">
         <div className="navbar fixed max-w-screen-2xl  z-10 opacity-30  bg-black text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      {nav}
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {nav}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;