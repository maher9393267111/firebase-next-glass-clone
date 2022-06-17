import React from 'react';
import {useState, useEffect} from 'react';
import ProductMaincart from "../components/ProductMaincart";
import { useAuth } from '../context/global';
const Search = () => {
    const {products,    searchkyword} = useAuth();
    return (
        <div>
            <h1>search Products</h1>

<div>

<div className=' grid grid-cols-3 gap-4'>
{products
            .filter((value) => {
              if (searchkyword === '') {
                return value;
              } else if (
                
                value.name.toLowerCase().includes(searchkyword.toLowerCase())
              ) {
                console.log('searching start--->', value.name,value);
                return value;
              }
            })
            .map((product) => (
             <div>
 <div className=' w-[300px] h-[400px] ml-12 mr-6 mt-4 mb-4'>
    
    <ProductMaincart product={product} />
    </div>

             </div>
            
            ))}
</div>



</div>


        </div>
    );
}

export default Search;
