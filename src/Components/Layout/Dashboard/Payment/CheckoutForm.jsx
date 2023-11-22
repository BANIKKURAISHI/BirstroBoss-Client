import {CardElement, useStripe,useElements} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import useCard from './../../../../Hooks/useCard';
import useAuth from '../../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CheckoutForm = () => {
    const stripe = useStripe();
  const elements= useElements();
  const [error,setError]=useState()
  const [clientSecret,setClientSecret]=useState(' ')
  const [id,setId]=useState()
const navigate =useNavigate()
  const axiosSecure=useAxiosSecure()
  const [cart,refetch]=useCard()
  const {user}=useAuth()
  const price =parseFloat(cart.reduce((total,item)=>total+item.price ,0))
  useEffect(()=>{
    console.log(price)
  if(price > 0){
    axiosSecure.post('/create-payment-intent',{price:price})
  .then(res=>{
    console.log(res.data.clientSecret)
    setClientSecret(res.data.clientSecret)
  })
  }
  },[ axiosSecure,price])
    const handleSubmit= async (e)=>{
             e.preventDefault() 
             if(!stripe || !elements){
                return
             }
             const card =elements.getElement(CardElement)
             if(card===null){
                return
             }

             const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card,
              });

              if(error){
                console.log('error handle kor',error)
                setError(error.message)
              }
             else{
                console.log('payment method is well good',paymentMethod)
                setError(' ')
             }

             ///confirm payment 
             const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
              payment_method:{
                card:card, 
                billing_details:{
                 email:user?.email ||"anonyms",
                 name:user?.displayName ||"anonyms"
                }

              }
             })
             if(confirmError){
              console.log('confirm error :',confirmError)
             }
             else{
              console.log('paymentIntent',paymentIntent)
              if(paymentIntent?.status==='succeeded'){
              
               // console.log('This is my   transaction pin',paymentIntent.id)
                setId(paymentIntent?.id) }
              
              }
              const payment ={
                name:user?.displayName,
                email:user?.email,
                cartIds :cart?.map(item=>item._id),
                menuIds:cart?.map(item=>item.menu),
                price:price,
                transactionId:paymentIntent.id,
                time:new Date() , ////covert moment js for utc time means all world wide time
                status:'pending'
               }
               console.log (payment)
            const res=await axiosSecure.post('/payment',payment)
           // console.log('payment save ',res.data)
            refetch()
            if(res?.data?.paymentResult?.insertedId){
              Swal.fire({
                title: "Success!",
                text: "Your order has been successful.",
                icon: "success"
              });
              navigate('/dashboard/paymentHistory')
            }
           }
    return (
        <div className='m-32'>
            <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
               
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-info btn-sm my-10' type="submit" disabled={!stripe||!clientSecret}>
        Pay
      </button>
      <p className='text-red-500'>{error}</p>
      {
        id &&  <p className='text-green-500'>Your transaction id {id}</p> 
      }
     
            </form>
        </div>
    );
};

export default CheckoutForm;