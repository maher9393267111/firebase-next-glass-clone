import React from 'react';
import { useAuth } from '../context/global';

import Link from "next/link";



const Showingproducts = ({productsnumber}) => {

const {products} = useAuth();

    return (
        <div>
        

        {/* -header- */}

<div>

<div className=' flex justify-between ml-12  mr-12'>

<div>

    <h1>
        Recommended Products
    </h1>
</div>

<div className=''>

<p>
<Link href='/recommended'>
    <a>
        See all
    </a>
</Link>
</p>


</div>






</div>



</div>



        </div>
    );
}

export default Showingproducts;
