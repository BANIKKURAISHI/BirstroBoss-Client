import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const PaymentHistory = () => {
    const {user}=useAuth()
    const email=user?.email 
    const axiosSecure=useAxiosSecure()
    const {data:payments =[]}=useQuery({
        queryKey:['payments',email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/payment/${email}`)
            return res.data
        }
    })
    return (
        <div>
            <h1 className="text-4xl">Total payment {payments.length}</h1>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Price</th>
        <th>Transaction Id </th>
       
        <th>Time</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
        payments.map((payment,index)=>
      
      <tr key={payment._id}>
        <th>{index + 1}</th>
        <th>{payment.price}</th>
        <td>{payment.transactionId}</td>
        <td>{payment.time}</td>
        <td>{payment.status}</td>
      </tr>)}
      
    </tbody>
  </table>
</div>
            </div>
        </div>
    );
};

export default PaymentHistory;