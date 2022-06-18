import React from "react";
import { Button, Drawer } from "antd";
import { useState, useEffect } from "react";
import { diffcontext } from "../context/diff";
import { useAuth } from "../context/global";
import CartItem from "./cartitem";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AnimatePresence, motion } from "framer-motion";
import { useSub } from "../context/sub";

const Cartbar = () => {
  const [cartitems, setCartitems] = useState([]);
  const { showDrawer, onClose, visible } = diffcontext();
  const { cartchanged,cartsub } = useSub();

  const { usercart, setCarbarsend, totalprice, setTotalprice, userinfo, dene } =
    useAuth();

  //console.log('totla price in sidebar---->',totalprice);

  useEffect(() => {
    //  if(usercart.length > 0){

    setCartitems(usercart);
    setCarbarsend(usercart);
    //  console.log("cart cartbar----->", cartitems);
    if (usercart === [] || usercart?.length < 1) {
      // reset total price
      setTotalprice(0);
    }

    // }
  }, [usercart, showDrawer,cartchanged]);

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

        {cartitems?.length > 0 ? (
          <div>
            <h1>{cartsub?.length}</h1>

            <AnimatePresence>
              <div>
                {cartitems &&
                  cartitems.length > 0 &&
                  cartitems.map((item, index) => {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3 }}
                      >
                        <div>
                          <CartItem item={item} key={index} />
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </AnimatePresence>

            <div>
              <div>
                <h1>total price</h1>

                <div className=" flex justify-between ml-6 mr-6  items-center ">
                  <div>
                    <h1 className=" font-bold text-xl">{totalprice}$</h1>
                  </div>

                  <div className=" w-[200px]">
                    <button
                      type="button"
                      class="text-white block w-full  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" text-xl  font-bold">
            {" "}
            <h1>Cart is Empty</h1>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Cartbar;
