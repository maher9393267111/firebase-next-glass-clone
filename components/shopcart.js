import React from 'react';
import {useState, useEffect} from 'react';
import { useAuth } from '../context/global';
const Shopcart = ({product}) => {

const [productid, setProductid] = useState('');
const {addtocart} = useAuth();


console.log("product", product.id);

const handleproductid = (product) => {

addtocart(product);
console.log("productid", product);


}



    return (
        <div className='  w-[333px] h-[288px]   overflow-y-hidden border-2 border-blue-600'>
            

            <div class="card  bg-slate-400">
  <div

  onClick={(e) => handleproductid(product)}
  class="cardTop">
<img
className='h-full w-full'

src={product.images[0].image} alt="" />

  </div>
  <div class="cardBottom">
    <div class="cardText">
      {/* <!--       Title and description will always show --> */}
      <h3 class="cardTitle">{product?.name}  </h3>
      <h4 class="cardInfo">{product?.category}</h4>
      <h1>{product?.price}$</h1>
      {/* <!--       Only visibile when parent element is hovered over --> */}
      <div class="cardHoverText">
        
        <div>

        <button  type="button" class="text-white  block w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add to cart</button>
         
        </div>
      </div>
      {/* <!--       Only visibile when parent element is hovered over --> */}
    </div>
  </div>
</div>




        </div>
    );
}

export default Shopcart;
