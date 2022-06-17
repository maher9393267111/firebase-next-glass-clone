import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/global";
const Shopcart = ({ product }) => {
  const {
    addtocart,
    usercart,
    productid,
    setProductid,
    setRefreshcart,
    refreshcart,
    
  } = useAuth();
  const [incart, setincart] = useState(false);

  const handleproductid = async (product) => {
    await addtocart(product);
    await setRefreshcart(!refreshcart);

    setProductid(product.id);

    console.log(usercart.length);


 const checkme=     setincart(usercart.findIndex((item) => item.id === productid) == -1)
 //   await usercart.filter((item) => item.id == product.id)
console.log('checkme------>',checkme);


   

        
      
 




  };

  return (
    <div className="  w-[333px] h-[288px]   overflow-y-hidden border-2 border-blue-600">
      <div class="card  bg-slate-400">
        




        <div  class="cardTop">
          <img className="h-full w-full" src={product.images[0].image} alt="" />
        </div>
        <div class="cardBottom">
          <div class="cardText">
            {/* <!--       Title and description will always show --> */}
            <h3 class="cardTitle">
              {product?.name} {incart ? "incart" : "not in cart"}{" "}
            </h3>
            <h4 class="cardInfo">
              {product?.category} {usercart?.length}
            </h4>
            <h1>{product?.price}$</h1>
            {/* <!--       Only visibile when parent element is hovered over --> */}
            <div class="cardHoverText">
              <div>
                <button
                onClick={(e) => handleproductid(product)}
                  type="button"
                  class={` ${incart ? ' block w-full bg-gray-800  text-white' : 'text-black bg-white block w-full '}  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 `}
                >
               {!incart ? ' Add to cart ' : 'Remove from cart'}  
                </button>
              </div>
            </div>
            {/* <!--       Only visibile when parent element is hovered over --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopcart;
