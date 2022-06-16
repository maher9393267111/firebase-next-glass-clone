import React from "react";
import { useAuth, currentUser } from "../context/global";
import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";
import { diffcontext } from "../context/diff";
import { useGetRecoilValueInfo_UNSTABLE } from "recoil";

const Navbar = () => {
  const [active, setActive] = useState("home");
  const { show, setShow } = diffcontext();
  const { currentUser, logout, userinfo } = useAuth();
  const [addfixed, setAddfixed] = useState("");
  const { showDrawer, onClose } = diffcontext();

  useEffect(() => {
    const scrollfunction = () => {
      if (window.scrollY > 100) {
        console.log("addfixed", addfixed);
        setAddfixed("scrollnav");
      } else {
        console.log("remove fixed", addfixed);
        setAddfixed("");
      }


    };



// if end the page remove fixed
if (window.scrollheight === window.scrollY) {

  setAddfixed("");
}


    window.addEventListener("scroll", scrollfunction);
  }, []);

  return (
    <div className=" ">
      <div>
        {/* {userinfo?.name} */}
        <Row
          className={`  ${addfixed}   bg-white z-30  ml-8 min-h-[78px]  transition-all  duration-200   shadow-xl`}
        >
          <Col className="  " span={12}>
            <div>
              <div className="  pt-[46px]">
                {/* flex image and list-- */}

                <div className=" flex justify-between">
                  {/* ---image-- logo-- */}

                  <div className=" w-[38%] ">
                    <img
                      className=" sm:hidden  ml-[40px]  pb-[19px] md:block w-20 h-20  object-cover"
                      src="https://cdn2.iconfinder.com/data/icons/css-vol-1/24/adidas-256.png"
                      alt=""
                    />
                  </div>

                  {/* list nav- */}

                  <div className=" flex-1 sm:ml-6 self-center">
                    <ul className=" flex gap-6 navlist    ">
                      <li
                     
                      >
                        <Link href="/">
                          <a
                             onClick={() => setActive("home")}
                             className={`${
                               active === "home"
                                 ? "text-gray-900 font-bold"
                                 : "text-gray-500"
                             }`}
                          >Home</a>
                        
                        </Link>
                        {/* {currentUser?.email} */}
                      </li>
                      <li
                        onClick={() => setActive("shop")}
                        className={`${
                          active === "shop"
                            ? "text-gray-900 font-bold"
                            : "text-gray-500"
                        }`}
                      >
                        <Link href="/shop">
                          <a
                            onClick={() => setActive("shop")}
                            className={`${
                              active === "shop"
                                ? "text-gray-900 font-bold"
                                : "text-gray-500"
                            }`}
                          >Shop</a>
                        </Link>
                      
                      </li>
                      <li
                      
                      >

                        <Link href="/featured">
                          <a
                            onClick={() => setActive("featured")}
                            className={`${
                              active === "featured"
                                ? "text-gray-900 font-bold"
                                : "text-gray-500"
                            }`}
                          >Featured</a>
                        </Link>
                        
                      </li>
                      <li
                       
                      >
                        <Link href="/recommended">
                          <a
                           onClick={() => setActive("recomended")}
                           className={`${
                             active === "recomended"
                               ? "text-gray-900 font-bold"
                               : "text-gray-500"
                           }`}
                          >Recommended</a>
                        </Link>
                           

                        
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col span={12}>
            <div>
              {/* -flex search input and  auth  */}

              <div className=" flex justify-between  sm:ml-12 lg:ml-2  sm:pt-[42px]   lg:pt-[60px]">
                {/* ------------------search input-------- */}

                <div className=" flex-grow">
                  <div className=" flex gap-1 ">
                    {/* ---filter- */}

                    <div className=" pt-[10px]">
                      <div>
                        <div
                          onClick={() => setShow(true)}
                          className=" flex gap-2   cursor-pointer justify-center"
                        >
                          <p>filter</p>
                          <p>
                            <img
                              className="  w-6 h-6"
                              src="https://cdn2.iconfinder.com/data/icons/e-commerce-line-8-1/1024/filter8-128.png"
                              alt=""
                            />
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* -search input- */}

                    <div>
                      <form class="flex items-center">
                        <label for="simple-search" class="sr-only">
                          Search
                        </label>
                        <div class="relative   w-[288px]">
                          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                              class="w-5 h-5 text-gray-500 dark:text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="simple-search"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                            required
                          />
                        </div>

                        <div className="ml-2">
                          <img
                            onClick={showDrawer}
                            className="w-8 h-8"
                            src="https://cdn1.iconfinder.com/data/icons/shopping-346/24/buy-bag-cart-shop-shopping-256.png"
                            alt=""
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* auth- */}

                <div className=" w-[35%]">
                  {/* //----------------------------------------------- */}

                  {!currentUser?.email ? (
                    <div className=" flex gap-6">
                      <div>
                        <button
                          type="button"
                          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                          <Link href="/auth/login">
                            <a className="text-white bg-gray-800 hover:bg-gray-900 ">
                              Login
                            </a>
                          </Link>
                        </button>
                      </div>

                      {/* -register- */}

                      <div>
                        <button
                          type="button"
                          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          <Link className=" " href="/auth/register">
                            <a className="   text-blue-700   ">Register</a>
                          </Link>
                        </button>
                      </div>

                      {/* //------------------------ */}
                    </div>
                  ) : (
                    <div className=" flex gap-6">
                      <div>
                        <button
                          onClick={logout}
                          type="button"
                          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Logout
                        </button>
                      </div>

                      <div>
                        <div className="  relative    -top-2">
                          <div>
                            <img
                              className="w-8 h-8  mx-auto rounded-full"
                              src={userinfo?.image}
                              alt=""
                            />
                          </div>
                          <p className="  font-bold   hover:text-blue-700  dark:hover:text-blue-700">
                            {userinfo?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Navbar;
