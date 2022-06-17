import React from "react";
import { Button, Drawer } from "antd";
import { useState, useEffect } from "react";
import { diffcontext } from "../context/diff";
import { useAuth } from "../context/global";
import CartItem from "./cartitem";

const Cartbar = () => {
  const [cartitems, setCartitems] = useState([]);
  const { showDrawer, onClose, visible } = diffcontext();

  const { usercart, setCarbarsend ,totalprice,setTotalprice} = useAuth();

  console.log('totla price in sidebar---->',totalprice);

  useEffect(() => {
    //  if(usercart.length > 0){

    setCartitems(usercart);
    setCarbarsend(usercart);
    console.log("cart cartbar----->", cartitems);
    if (usercart  === []   || usercart?.length < 1) {

      // reset total price
      setTotalprice(0);
    }

    // }
  }, [usercart, showDrawer]);

  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
          Open
        </Button> */}
      <Drawer
        width={520}
        style={{ transition: " all2.5s  ease-in-out" }}
        className="  transition-all   duration-500"
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        {/* ----content- */}

        <div>
          <h1>{cartitems?.length}</h1>
          <div>
            {cartitems &&
              cartitems.length > 0 &&
              cartitems.map((item, index) => {
                return (
                  <div>
                    <CartItem item={item} key={index} />
                  </div>
                );
              })}
          </div>

<div>

<div>
<h1>total price</h1>

<div className=" flex justify-between ml-6 mr-6">



<div>
  <h1>{totalprice}</h1>
</div>

<div>
  <button>Checkout</button>
</div>


</div>


</div>


</div>




        </div>
      </Drawer>
    </>
  );
};

export default Cartbar;
