
import { HiArchiveBox } from "react-icons/hi2";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../Section title/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";



const ManageItem = () => {
  const [menu, ,refetch]=useMenu()
 
  const axiosSecure=useAxiosSecure()
  const deleteItem=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        axiosSecure.delete(`/menu/${id}`)
        .then(res=>{
           if(res.data.deletedCount>0)

           Swal.fire({
           title: "Deleted!",
           text: "Your file has been deleted.",
           icon: "success"
         });
         refetch()
          console.log (res.data)
        })
        
      }
    });
  }
    return (
        <div>
           
          <SectionTitle heading="Manage All Items"  subHeading="Hurry up ">

          </SectionTitle>
          <div>
            
                <div className="overflow-x-auto">
                <table className="table">
             
                  <thead>
                    
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Favorite Color</th>
                      <th>Action</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  { menu.map((item,index)=>
                    <tr key={item._id}>
                      <th>{index+1}</th>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td><img src={item.image} className="w-16 h-16 rounded-full" alt="" /></td>
                     <th><Link className="flex flex-row" to={`/dashboard/update/${item._id}`}><FaEdit className="my-1 text-xl ml-1"></FaEdit> Update</Link></th>
                     <button onClick={()=>deleteItem(item._id)} className="btn btn-ghost btn-lg"><HiArchiveBox></HiArchiveBox></button>
                    </tr>
                   )}
                  </tbody>
                </table>
              </div>
            
          </div>
        </div>
    );
};

export default ManageItem;