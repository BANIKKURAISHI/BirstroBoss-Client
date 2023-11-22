import { FaUpload } from "react-icons/fa";
import SectionTitle from "../../Section title/SectionTitle";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

//import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Update = () => {
  const { name, recipe, price, category, _id } = useLoaderData();
  const imageHosting = import.meta.env.VITE_IMAGE_HOSTING;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHosting}`;

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  //const axiosSecure=useAxiosSecure()
  const onSubmit = async (data) => {
    console.log(data)
    const imageFile = { image: data.image[0] };
    let menuItem = {
      name: data.name,
      price: data.price,
      category: data.category,
      recipe: data.recipe,
      //image :res.data.data.display_url
    };
    if(data.image.length > 0){
    const res = await axiosPublic.post(imageHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },

    });
    console.log(res)
     menuItem.image =res.data.data.display_url
   }
    //if(res.data.success){
   

    axios.patch(`http://localhost:5000/update/${_id}`, menuItem)
    .then((res) => {
      console.log(res.data);
      if(res.data.modifiedCount >0){
        Swal.fire({
          title: "Success!",
          text: "Your file has been updated.",
          icon: "success"
        });
      }

    
    });
   
 
  //}
    // fetch(`http://localhost:5000/update/${_id}`,{
    //     method: 'PATCH',
    //     headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //       },
    //     body: JSON.stringify(menuItem),

    //   })
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));

    // console.log(menuRes.data)
    //  if(menuRes.data.modifiedCount >0){
    //   reset()
    //   Swal.fire({
    //     position: "top-end",
    //     icon: "success",
    //     title: `${data.name} has been update`,
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    //  }
    // }
  };



  return (
    <div>
      <SectionTitle
        heading="Update An item"
        subHeading="---Refresh items-----"
      ></SectionTitle>

      <div className="mx-10 w-[660px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label>Name</label>
            <input
              defaultValue={name}
              className=" h-10 rounded-lg"
              {...register("name")}
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-col w-96">
              <label>Category</label>
              <select
                defaultValue={category}
                {...register("category")}
                className="select select-bordered w-full max-w-xs"
              >
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
              <input
                defaultValue={price}
                type="text"
                {...register("price")}
                placeholder="Enter your price"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Recipe</label>
            <textarea
              defaultValue={recipe}
              {...register("recipe")}
              className="textarea w-[660px] textarea-bordered"
              placeholder="Enter your  Recipe"
            ></textarea>
          </div>

          <div className="my-3">
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="my-4 btn btn-outline btn-warning w-full">
            <FaUpload></FaUpload>Update Items
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
