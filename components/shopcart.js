import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/global";
import { toast } from "react-toastify";
;

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

//---------------------------------------------

const handleproductid = async (product) => {
  // onlysend on colorwith his images  to acart

  const selecteditems = {};

  selecteditems.id = product.id;
  selecteditems.name = product.name;
  selecteditems.price = product.price;
  selecteditems.image = product.images[0].image;
  selecteditems.color = product.images[0].color;
  selecteditems.category = product.category;
  selecteditems.title = product.title;

  await addtocart(selecteditems);
  await setRefreshcart(!refreshcart);

  setProductid(product.id);

  console.log(carbarsend.length);

  toast.success(`${carbarsend.length} items  in cart`);
};




//---------------------------------------------


  const [incart, setincart] = useState(false);


  useEffect(() => {
    if (carbarsend?.length > 0) {
      const hello = carbarsend.filter((item) => {
        return item.id === product.id;
      });

      if (hello.length > 0) {
        setincart(true);
      } else {
        setincart(false);
      }
      //console.log('hello',hello)
    }
  }, [carbarsend]);




  return (
    <div className="  w-[333px] h-[288px]   overflow-y-hidden border-2 border-blue-600">
      <div class="card  bg-slate-400">
        <div class="cardTop">
          <img
            className="h-full w-full"
            src={product?.images[0]?.image}
            alt=""
          />
        </div>
        <div class="cardBottom">
          <div class="cardText">
            {/* <!--       Title and description will always show --> */}
            <h3 class="cardTitle">{product?.name}</h3>
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
