import React from 'react';
import getStripe from '../../lib/getStripe';
import { useAuth } from "../../context/global";
import { query, orderBy, collection, doc,setDoc,updateDoc } from "firebase/firestore";
import {
    useCollectionData,
    useDocumentData,
  } from "react-firebase-hooks/firestore";
  import { db } from "../../firebase";
const Step3 = () => {

    const { userinfo } = useAuth();
    const [orderdata] = useDocumentData(doc(db, "orders", `${userinfo?.email}`));
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

        await updateDoc(doc(db, "users", `${userinfo?.email}`), {
            cart: [],
            totalprice: 0,
        }
        );
        console.log('response Data------------>', data)
    
     //   toast.loading('Redirecting...');
    
        stripe.redirectToCheckout({ sessionId: data.id });
      }
    


    return (
        <div>
            
<div>


{/* ----header- */}
<div className=' relative'>

<div className=' absolute top-[-29px]   lg:left-[742px]'>
    Payment
</div>



<div>

<div>
   



            <button 
            onClick={handleCheckout}
            
            class="h-16 w-full rounded-sm bg-indigo-600 tracking-wide font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600">Confirm Payment</button>



</div>


</div>


</div>

</div>


        </div>
    );
}

export default Step3;
