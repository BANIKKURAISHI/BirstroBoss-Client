import { useForm } from "react-hook-form";
import SectionTitle from "../../../Section title/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const imageHosting =import.meta.env.VITE_IMAGE_HOSTING
const imageHostingApi =`https://api.imgbb.com/1/upload?key=${imageHosting}`
const AddItem = () => {
  const { register, handleSubmit,reset } = useForm();
  const axiosPublic=useAxiosPublic()
  const axiosSecure=useAxiosSecure()
  const onSubmit =async (data) => {
    const imageFile={image:data.image[0]}
   const res=await axiosPublic.post(imageHostingApi,imageFile,{
    headers: {
      "content-type": "multipart/form-data",
    }
   })
   if(res.data.success){
    const menuItem ={
      name:data.name ,
      price :data.price ,
      category:data.category,
      recipe:data.recipe ,
      image :res.data.data.display_url
    }
     const menuRes=await axiosSecure.post ('/menu',menuItem)
     console.log(menuRes.data)
     if(menuRes.data.insertedId){
      reset()
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.name} has been saved`,
        showConfirmButton: false,
        timer: 1500
      });
     }
    
   }
  console.log('this is the uploas picture ',res.data)
   };
  return (
    <div>
      <SectionTitle
        heading="Add An item"
        subHeading="---whats new-----"
      ></SectionTitle>

      <div className="mx-10 w-[660px]">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Name</label>
          <input  required  className=" h-10 rounded-lg" {...register("name",{required: true})} placeholder="Enter your name" />
          </div>
          <div className="flex flex-row justify-around" >
          <div className="flex flex-col w-96">
          <label>Category</label>
          <select defaultValue="default" required  {...register("category",{required: true})} className="select select-bordered w-full max-w-xs">
            <option disabled value="default">
             Select a category
            </option>
          
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
            <option value="soup">Dessert</option>
            <option value="offered">Offered</option>
         
          </select>
          </div>
          <div className="flex flex-col ml-10 w-96">
          <label>price</label>
          <input required type="text" {...register('price',{required: true})} placeholder="Enter your price" className="input input-bordered w-full max-w-xs" />
          
          </div>
          
          </div>
          <div className="flex flex-col">
          <label>Recipe</label>
          <textarea  required  {...register('recipe',{required: true})} className="textarea w-[660px] textarea-bordered" placeholder="Enter your  Recipe"></textarea>
          </div>

          

          <div className="my-3">
          <input  required  {...register('image',{required: true})} type="file" className="file-input w-full max-w-xs" />
          </div>

          <button className="my-4 btn btn-outline btn-warning w-full" ><FaUtensils></FaUtensils>ADD ITEM</button> 
        </form>
      </div>
    </div>
  );
};

export default AddItem;
