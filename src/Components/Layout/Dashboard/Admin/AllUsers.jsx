// import { useState } from "react";

// import MUIDataTable from "mui-datatables";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { HiArchiveBox, HiUsers } from "react-icons/hi2";
import Swal from "sweetalert2";





 const AllUsers=()=>{
    const axiosSecure=useAxiosSecure()

    const {data:users=[],refetch}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
        const result =await axiosSecure.get('/users',)
        return result.data
        }

      
    }
  )

   const deleteUser=(id)=>{
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
    
    axiosSecure.delete(`/users/${id}`)
    .then(res=>{
     if(res.data.deletedCount>0){
        refetch()
         Swal.fire({
             title: "Deleted!",
             text: "Your file has been deleted.",
             icon: "success"
           });
          
     }
    })

   }})
   }

   const makeAdmin=(id)=>{
    axiosSecure.patch(`/users/admin/${id}`)
    .then(res=>{
    console.log(res.data)
    if(res.data.modifiedCount>0){
        refetch()
        Swal.fire({
            title: "Success!",
            text: `${res.data.name} is an admin Now.`,
            icon: "success"
          });
    }
    })

   }

    return (

<div>
    <div>
    <h1>Total user : {users.length}</h1>
    <div className="overflow-x-auto">
    <table className="table">
        <thead>
          <tr>
            <th>
            #
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
     {
        users.map((item,index)=>
        <tr  key={item._id}>
        
    
         
          
            <th>
             {index}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-bold">{item.name}</div>
                 
                </div>
              </div>
            </td>
            <td>
           
              
              <span className="badge badge-ghost badge-sm">{item.email}</span>
            </td>
           {item.role==='admin'?"Admin":
            <th>
              <button onClick={()=>makeAdmin(item._id)} className="btn bg-orange-500 btn-ghost btn-lg"><HiUsers className="text-white text-xl"></HiUsers></button>
            </th>}
           
            <th>
              <button onClick={()=>deleteUser(item._id)} className="btn bg-white  btn-ghost btn-lg"><HiArchiveBox className="text-red text-xl"></HiArchiveBox></button>
            </th>
          
          </tr>
           )
        }
          </tbody>
       
     
        
      </table>
      </div>  
        
        
        
       
    
</div>
        
    </div>)

  
 };

 export default AllUsers;