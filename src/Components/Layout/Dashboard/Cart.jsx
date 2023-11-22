
//import axios from "axios";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCard from "../../../Hooks/useCard";
import { HiArchiveBox } from "react-icons/hi2";
import  Swal  from 'sweetalert2';


const Cart = () => {
    const [cart, refetch]=useCard()
    const  axiosSecure=useAxiosSecure()
     const TotalPrice =parseFloat(cart.reduce((total,item)=>total+item.price,0))

    const deleteItem =(id)=>{
      console.log(id)
     
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to Delete this cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/orders/${id}`)
   .then(res=>{
    if(res.data.deletedCount> 0){
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      refetch()
     }
   })
     
      

          
        }
      })
    }


    return (
        <div >
            <div className="grid grid-cols-3 py-10  justify-evenly bg-amber-300 text-white">
                <h1 className="text-3xl ml-5">Total Item {cart.length}</h1>
                <h1 className="text-3xl">Total Price {TotalPrice}</h1>
             {cart.length ?<Link to="/dashboard/payment"  className="btn mr-5 bg-amber-300 btn-sm">
             <button  >Pay</button>
             </Link>:
             <Link to="/dashboard/payment" disabled  className="btn mr-5 bg-amber-300 btn-sm">
             <button  >Pay</button>
             </Link>}
             {/* //disabled={!cart.length} */}
            </div>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     {
        cart.map((item,index)=>
            <tr key={item._id}>
            <th>
             {index}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
               
              </div>
            </td>
            <td>
            {item.name}
              
            </td>
            <td>${item.price}</td>
            <th>
              <button onClick={()=>deleteItem(item._id)} className="btn btn-ghost btn-lg"><HiArchiveBox></HiArchiveBox></button>
            </th>
          
          </tr>)
     }
    
     
     
    </tbody>

   
    
  </table>
</div>
            </div>
        </div>
    );
};

export default Cart;

 //fetch(`http://localhost:5000/orders/${id}`,{
//   method:'DELETE'
// })
// .then(res=>res.json())
// .then(data=>console.log(data))