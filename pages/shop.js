import React from 'react';
import {useAuth} from '../context/global';
import {useEffect,useState} from 'react';


const Shop = () => {


const {filteredproducts, setFilteredproducts} = useAuth();
//console.log('filterdproducts in SHop',filteredproducts, setFilteredproducts);

    return (
        <div>
            <h1>Shop</h1>
            <h1>{filteredproducts.length}</h1>

{filteredproducts?.map(product => (
    
<div>
    <h1>{product?.price }   {product?.name}</h1>
</div>

))}


        </div>
    );
}

export default Shop;
