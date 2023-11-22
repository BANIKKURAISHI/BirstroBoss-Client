import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import SubHome from "./SubHome";
import Menu from "../Page/Menu/Menu";
import Order from "../../Order/Order";
import Registration from "../Authentication/Registration";
import Login from "../Authentication/Login";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Cart from "../Layout/Dashboard/Cart";
import Privet from "../../Provider/Privet";
import Contact from "../Layout/Dashboard/Contact";
import AdminHome from "../Layout/Dashboard/Admin/AdminHome";
import AllUsers from "../Layout/Dashboard/Admin/AllUsers";
import AddItem from "../Layout/Dashboard/AdminPage/AddItem";
import AdminRoutes from "../../Provider/AdminRoutes";
import ManageItem from "../Layout/Dashboard/ManageItem";
import Update from "../Layout/Dashboard/Update";
import Payment from "../Layout/Dashboard/Payment/Payment";
import PaymentHistory from "../Layout/Dashboard/Payment/PaymentHistory";
import UserHome from "../Layout/Dashboard/Admin/UserHome";
//import Privet from './../../Provider/Privet';


const router = createBrowserRouter([
    {
      path: "/",
      element:<Home></Home>,
      children:[{
        path:'/',
        element:<SubHome></SubHome>
      },
      {
        path:'/singUp',
        element:<Registration></Registration>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
    ]
    },
    {
      path:'menu',
      element:<Menu></Menu>
    },
    {
      path:'order/:category',
      element:<Order></Order>
    },
   {
    path:'/dashboard',
    element:<Privet><Dashboard></Dashboard></Privet>,
    children:[{
      path:'cart',
      element:<Cart></Cart>
    },
    {
      path:'payment',
      element:<Payment></Payment>
    },
    {
      path:'profile',
      element:<UserHome></UserHome>
    },
    {
      path:'paymentHistory',
      element:<PaymentHistory></PaymentHistory>
    },

    //////////dash board user 
    {
      path:'contact',
      element:<Contact></Contact>
    },
    {
      path:'adminHome',
      element:<AdminHome></AdminHome>
    },
    {
      path:'allUsers',
      element:<AdminRoutes><AllUsers></AllUsers></AdminRoutes>
    },
    {
      path:'addItems',
    //  element:<AddItem></AddItem>
      element:<AdminRoutes><AddItem></AddItem></AdminRoutes>
    },
    {
      path:'manageItem',
      element:<AdminRoutes><ManageItem></ManageItem></AdminRoutes>
    },
    {
      path:'update/:id',
      element:<Update></Update>,
      loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
    }
  
  ]
   }
  
  ])
  export default router