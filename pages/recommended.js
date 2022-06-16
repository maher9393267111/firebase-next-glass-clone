import React from "react";
import { useAuth } from "../context/global";
import { useState, useEffect } from "react";
import Jumbatron from "../components/jumbatron";
const Recommended = () => {
  const { products } = useAuth();

  return (

<div className=" min-h-[100vh]">



    <div className=" pb-16">
      {/* header- */}

<Jumbatron 
title={'Recommended Products' }
image={'https://salinaka-ecommerce.web.app/images/banner-girl-1.24e9b8f48d5a0ac32680edd194503695.png'

}
/>

</div>
      
    </div>
  );
};

export default Recommended;
