////////////////////////tanstac queryy 
///first main jsx setup 
//2nd this page 
 import {
   
     useQuery,
   } from '@tanstack/react-query'
 import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
//import axios from 'axios';


 
 const useCard = () => {
      const axiosSecure=useAxiosSecure()
      const {user}=useAuth()
      const email=user?.email
      const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart',email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/orders?email=${email}`);
            return res.data;
        }
    })
  

  
     return [cart,refetch]
  
 };

 export default useCard;