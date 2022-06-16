import React from 'react';

const Shopcart = ({product}) => {
    return (
        <div className='  w-[288px] h-[288px]   overflow-y-hidden border-2 border-blue-600'>
            

            <div class="card  bg-slate-400">
  <div class="cardTop">
<img
className='h-full w-full'

src={product.images[0].image} alt="" />

  </div>
  <div class="cardBottom">
    <div class="cardText">
      {/* <!--       Title and description will always show --> */}
      <h3 class="cardTitle">{product?.name}</h3>
      <h4 class="cardInfo">{product?.category}</h4>
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
