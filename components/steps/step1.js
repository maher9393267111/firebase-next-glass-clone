import React from 'react';
import getStripe from '../../lib/getStripe';
import {useAuth} from '../../context/global'

import { query, orderBy, collection, doc } from "firebase/firestore";
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";


const Step1 = () => {

    const { userinfo } = useAuth();
    const [userdata] = useDocumentData(doc(db, "users", `${userinfo?.email}`));

    const handleCheckout = async () => {
        const stripe = await getStripe();
    
        console.log(userdata?.cart);
    
    
        const response = await fetch('/api/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userdata?.cart),
        });
        if(response.statusCode === 500) return;
        
        const data = await response.json();
    
     //   toast.loading('Redirecting...');
    
        stripe.redirectToCheckout({ sessionId: data.id });
      }
    
    




    return (
        <div>
        
<div className=' relative'>

{/* -header- */}

<div className='   top-[-42px] left-[-29px]  font-[600]  absolute '>
    order summary   {userdata?.cart.length }
</div>


<div>
<div className="btn-container">
            chekout
            <button type="button" className="btn" onClick={handleCheckout}> 
              Pay with Stripe
             </button>
          </div>
</div>



</div>


        </div>
    );
}

export default Step1;
