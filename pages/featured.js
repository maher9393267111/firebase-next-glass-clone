import React from 'react';
import Jumbatron from '../components/jumbatron';
import { useAuth } from "../context/global";
import { useState, useEffect } from "react";
const Featured = () => {

const { products } = useAuth();

    return (
        <div className=' min-h-[100vh]'>
            <div className=" pb-16">
      {/* header- */}

<Jumbatron
title ={'Featured Products'}

image ={'https://salinaka-ecommerce.web.app/images/banner-guy.fbf4f0f7396fe31ca288dc1dd9822342.png'}

/>

     
    </div>
            
        </div>
    );
}

export default Featured;
