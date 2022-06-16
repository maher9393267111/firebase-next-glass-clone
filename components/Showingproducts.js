import React from "react";
import { useAuth } from "../context/global";

import Link from "next/link";
import ProductMaincart from "./productMaincart";

const Showingproducts = ({ productsnumber,title,showlink=true }) => {
  const { products } = useAuth();

  return (
    <div>
      {/* -header- */}

      <div>
        <div className=" flex justify-between ml-12  mr-12">
          <div>
            <h1 className=" text-2xl">{title}</h1>
          </div>

          <div className="">

            { showlink &&
            <p>

              <Link href="/recommended">
                <a className=" text-lg font-bold  ">See all</a>
              </Link>
            </p>
            }
          </div>
        </div>



{/* -produycs map only 6 products */}


<div className=" product-container mt-12">
 

<div>

<div className=" grid ml-12 mr-6  sm:grid-cols-2  lg:grid-cols-3 gap-6">

{products.slice(0, productsnumber).map((product) => (
    
<div className="  sm:w-[100%] lg:w-[337px]">

<ProductMaincart product={product} />


</div>



))}




</div>





</div>




</div>




      </div>
    </div>
  );
};

export default Showingproducts;
