import React from "react";
import { useAuth } from "../context/global";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Shopcart from "../components/shopcart";

const Shop = () => {
  const {
    filteredproducts,
    setFilteredproducts,
    filterarray,
    setFilterarray,
    selected,
  } = useAuth();

  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <div>


{/* header- */}


<div>
    <h1
    className=" text-2xl font-bold   text-center mt-6 mb-6"
    >Shop Products</h1>
</div>

{/* ---all products- */}


<div className=" mt-12"> 


<div>


{/* grid- */}


<div className=" grid sm:grid-cols-2  gap-6 ml-12 mr-12 lg:grid-cols-3">

 {filteredproducts?.map(product => (
    
<div>
 <Shopcart  product={product}/>
</div>

))}



</div>





</div>





</div>




      </div>
    </div>
  );
};

export default Shop;
