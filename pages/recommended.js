import React from 'react';
import { useAuth } from '../context/global';
import {useState,useEffect} from 'react';
const Recommended = () => {
const {products} = useAuth();


    return (
        <div>
            <h1>Recommended</h1>
            {products.length}
            
        </div>
    );
}

export default Recommended;
