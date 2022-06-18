import React from 'react';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/router'

import { useAuth } from "../context/global";
const Product = () => {

    const {singleproduct,oneproduct} = useAuth();

 

    const router = useRouter()
  
    const productid = router.query.produtid
//console.log('productid is :--------->',routeis)
    

useEffect(() => {

singleproduct(productid)



}, [productid])





    return (
        <div>
            <h1>Product  : {oneproduct?.name}</h1>
        </div>
    );
}

export default Product;
