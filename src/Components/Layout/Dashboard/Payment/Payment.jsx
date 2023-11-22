import {loadStripe} from '@stripe/stripe-js';
import SectionTitle from './../../../Section title/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
    return (
       < div>
    

        <div>
            <SectionTitle
            heading='Payment' 
            subHeading='Make sure your order '></SectionTitle>
            
        </div>
        <div className='ml-5 mr-20'>
             <Elements stripe={stripePromise}  >
             <CheckoutForm />
             </Elements>
        </div>
        </div>
    );
};

export default Payment;