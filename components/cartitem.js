import React from 'react';
import {useAuth} from '../context/global';
import { useState,useEffect } from 'react';

const Cartitem = ({item}) => {


const {increaseQuantity, decreaseQuantity} = useAuth();

    return (
        <div>
            
            <div className=' flex  items-center font-bold   justify-between'>

{/* --image- */}

<div 
className=' w-18 h-18'

>
<img
className=' w-16 h-16   rounded-full'
src={item.image} alt="" />
</div>


<div className=' w-20'>

    <h1 className=' text-[13px] font-bold'>{item.name}</h1>
</div>

<div className=' w-[63px] text-center'>


<p
style={{ backgroundColor: `${item.color === 'white' ? 'grey' : item.color}` }}
className='  w-[27px] h-[27px] rounded-full'
></p>

</div>


<div className=' mr-20 h-[77px] flex items-center'>

{/* -decrease- */}
    <div>
<img
onClick={()=>decreaseQuantity(item)}
className=' h-6 w-6'
src="https://cdn1.iconfinder.com/data/icons/basic-user-interface-7/24/delete_remove_minus_decrease-128.png" alt="" />
    </div>

<p


className=' ml-2 mr-2  translate-y-[10px]  k  text-[20px]'>{item.quantity}</p>

{/* increse- */}

<div>

    <img
    onClick={()=>increaseQuantity(item)}
    className='w-6 h-6'
    src="https://cdn4.iconfinder.com/data/icons/outline-ui-icons-1/115/add-256.png" alt="" />

</div>

</div>



<div
className=' pt-3  mr-2'
>
  
    <p> Total :{item.quantity * item.price}</p>
</div>

            </div>



            
        </div>
    );
}

export default Cartitem;
