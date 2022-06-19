import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Showingproducts from "../../components/Showingproducts";
import {
  doc,
  collection,
  getDocs,
  limit,
  orderBy,
  where,
  query,
  collectionGroup,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useSub } from "../../context/sub";
import { useAuth } from "../../context/global";

import { toast } from "react-toastify";
const Product = ({ id }) => {
  const { name, cartlength } = useSub();
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
  const router = useRouter();

  const productid2 = router.query.produtid;
  const [selectedimage, setSelectedimage] = useState("");
  const [selectedcolor, setSelectedcolor] = useState("");

  const [oneproduct, setProduct] = useState({});

  const handleadd = async () => {
    const product = {};

    product.id = productid2;
    product.image = selectedimage;
    product.color = selectedcolor;
    product = Object.assign(product, oneproduct);
    console.log("product in page after ASSIGN---->", product);

    addtocart(product);
    cartlength();
  };

  useEffect(() => {
    if (carbarsend?.length > 0) {
      const hello = carbarsend.filter((item) => {
        return item.id === productid2;
      });

      if (hello.length > 0) {
        setincart(true);
      } else {
        setincart(false);
      }
      //console.log('hello',hello)
    }
  }, [carbarsend]);

  const fetchproduct = async () => {
    await getDoc(doc(db, "products", productid2)).then((docSnap) => {
      setProduct(docSnap.data());
      setSelectedimage(docSnap.data().mainimage);

      // console.log("product information is- :--------->⏩", oneproduct);
    });
  };

  const handleselectedimage = (image) => {
    setSelectedimage(image);
  };

  // if there params fetch product from firebase

  useEffect(() => {
    if (productid2) {
      //  console.log("id is changeddd--->⏩⏩⏩   :--------->", productid2);
      fetchproduct();
    }
  }, [productid2]);

  return (
    <div>
      <div className=" pb-16">
        <Link href={"/shop"}>
          <h1 className=" flex gap-6 font-bold teext-2xl mt-12 ml-16 ">
            {" "}
            <img
              className=" w-10 h-10 rounded-full  mt-[4px]"
              src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/back-1-256.png"
              alt=""
            />
            <p className=" text-3xl">Back to shop </p>{" "}
          </h1>
        </Link>

        {/* content-Back to shop */}

        <div>
          <div className=" w-[88%] mx-auto  border-2  flex sm:flex-col lg:flex-row   min-h-[600px]  border-blue-400  pb-12">
            {/* ----left- */}

            <div className="sec-left sm:w-full lg:w-1/2   ">
              {/* -flex small images and big iamage- */}

              <div className="flex gap-6  lg:mt-12  sm:mt-4 sm:flex-col-reverse lg:flex-row">
                {/* -small iamages */}

                <div>
                  <div className="flex sm:flex-row lg:flex-col  sm:text-center gap-2">
                    {oneproduct.images?.length > 1 &&
                      oneproduct.images.map((image, index) => {
                        return (
                          <div className=" w-28 h-32 mb-4 ml-6">
                            <img
                              onClick={() => handleselectedimage(image.image)}
                              className=" w-full h-full border-2 mb-4"
                              src={image?.image}
                              alt=""
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* big imag- */}

                <div>
                  <div className=" ml-2 mr-4 ">
                    <div className=" ">
                      <img
                        className="lg:h-auto w-full  sm:h-[433px]  object-cover"
                        src={selectedimage}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ----right- */}
            <div className="sec-right  sm:w-full lg:w-1/2  ">
              <div className=" h-full">
                {/* ----content wrapper--- */}
                <div className=" mt-16   ">
                  <div className=" ml-8">
                    <div>
                      <h1 className=" text-xl">{oneproduct?.category}</h1>

                      <h1 className=" text-2xl mt-2 "> {oneproduct?.name}</h1>

                      <div>
                        <p className=" text-sm w-3/4 mt-4 ">
                          {oneproduct?.title}
                        </p>
                      </div>

                      <div className=" mt-4 w-3/4 ml-2">
                        <label
                          for="countries"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >
                          Select Size
                        </label>
                        <select
                          id="countries"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected>xl</option>
                          <option value="md">md</option>
                          <option value="lg">lg</option>
                          <option value="small">small</option>
                          <option value="mini">mini</option>
                        </select>
                      </div>

                      {/* -cololors- */}

                      <div>
                        <div className=" flex gap-4 mt-6 ml-6">
                          {oneproduct?.images?.map((item, index) => {
                            return (
                              <div>
                                <p
                                  onClick={() => {
                                    handleselectedimage(item.image);
                                    setSelectedcolor(item.color);
                                  }}
                                  className=" rounded-full inline-block w-[30px]  border-2 h-[30px] "
                                  style={{ backgroundColor: `${item.color}` }}
                                >
                                  {" "}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* ----add to cart----- */}

                      <div>
                        <div>
                          <div>
                            <button
                              onClick={handleadd}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className=" mt-12 pb-12">


<Showingproducts productsnumber={8}  title={'Recommended Products'} />



</div>


      </div>
    </div>
  );
};

export default Product;
