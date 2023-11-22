import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCard from "../../Hooks/useCard";
//import  axios  from 'axios';




const FoodCard = ({ item }) => {
  const { name, image, recipe, price ,_id} = item;
 const {user}=useAuth()
 const [,refetch]=useCard()
  const navigate =useNavigate()
  const location=useLocation()
  const axiosSecure=useAxiosSecure()

  const addCartButton=()=>{
 if(user && user.email){
  console.log(name,image,recipe,price)
  const cartItem ={
    menu:_id,name,image,price,email:user.email
  }
  axiosSecure.post('http://localhost:5000/cart',cartItem)
  .then(res=>{
    console.log(res.data)
    if(res.data.insertedId){
      Swal.fire({
        title: "Success",
        text: `${name} is successfully save to add cart.`,
        icon: "success"
      });
      refetch()
    }
  })
 }
   else{Swal.fire({
        title: "You are not login ?",
        text: "You need first login for add to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I want log in!"
      }).then((result) => {
        if (result.isConfirmed) {
        navigate('/login',{state:{form:location}})
        }
      });}
 
  }
  return (
    <div>
      <div className="card  w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>
        <p className="bg-black text-white py-2 px-4 mr-4 mt-4 absolute right-0">
          ${price}
        </p>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">{name}</h2>

          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button onClick={()=>addCartButton(item)} className="btn btn-outline bg-stale-200  border-0 border-orange-400 border-b-4 mt-5">Add to card</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
