import React from 'react';
import {useAuth} from '../context/global';
import {useEffect,useState} from 'react';
import {  toast } from 'react-toastify';


const Shop = () => {


const {filteredproducts, setFilteredproducts,filterarray,setFilterarray} = useAuth();
//console.log('filterdproducts in SHop',filteredproducts, setFilteredproducts);

// filter array items check


const notify = () => toast("Wow so easy!");

    return (
        <div>
            <h1>Shop</h1>
            <h1>{filteredproducts.length}</h1>


<div>

<button onClick={notify}>Notify!</button>


<h1
onClick ={() => { filterarrayitems(filterarray)}}
>click me</h1>

</div>


{filteredproducts?.map(product => (
    
<div>
    <h1>{product?.price }   {product?.name}</h1>
</div>

))}


        </div>
    );
}

export default Shop;
