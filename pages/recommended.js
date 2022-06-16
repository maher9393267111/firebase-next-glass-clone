import React from 'react';
import { useAuth } from '../context/global';
import {useState,useEffect} from 'react';
import Showingproducts from '../components/Showingproducts';
const Recommended = () => {
const {products} = useAuth();


    return (
        <div>
            
<div className=''>

<h1
className='  mt-12 text-3xl font-bold text-center'

>Recommended Products</h1>

<img
className='w-[688px] h-[400px]  object-cover  text-center  block  mx-auto'
src="https://s.wsj.net/public/resources/images/BN-RA570_1201ad_GR_20161201105915.jpg"/>

</div>


<div className=' mt-16 mb-12 pb-12'>
<Showingproducts productsnumber={12}  showlink={false} title={'Recommended Products'} />
</div>


           
            
        </div>
    );
}

export default Recommended;
