import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/global";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
const Shopcart = ({ product }) => {
  const {
    addtocart,
    usercart,
    productid,
    setProductid,
    setRefreshcart,
    refreshcart,
    carbarsend, 
  } = useAuth();
  const [incart, setincart] = useState(false);

  const handleproductid = async (product) => {
    await addtocart(product);
    await setRefreshcart(!refreshcart);

    setProductid(product.id);





  console.log(carbarsend.length);

  toast.success(`${carbarsend.length} items  in cart`);

 
  const arr=[]
  await carbarsend.map((item)=>{
    arr.push(item.id)
  }
  )
  
  
   
      console.log('arr',arr)
      console.log(`hello ${incart ,'productid-----------',product.id} `);





  };




useEffect(() => {

if (carbarsend?.length > 0) {


  const hello =  carbarsend.filter((item) => { return item.id === product.id });

  if (hello.length > 0) {
    setincart(true);
  }

  else {
    setincart(false);
  }
  console.log('hello',hello)
  }

}, [carbarsend]);






  return (
    <div className="  w-[333px] h-[288px]   overflow-y-hidden border-2 border-blue-600">
      <div class="card  bg-slate-400">
        <div class="cardTop">
          <img className="h-full w-full" src={product.images[0].image} alt="" />
        </div>
        <div class="cardBottom">
          <div class="cardText">
            {/* <!--       Title and description will always show --> */}
            <h3 class="cardTitle">
              {product?.name}   {carbarsend?.length}
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
                  class={` ${
                    incart
                      ? " block w-full bg-gray-800  text-white"
                      : "text-black bg-white block w-full "
                  }  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 `}
                >
                  {incart ? " remove cart " : "add to cart"}
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
