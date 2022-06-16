import React from 'react';
import {useAuth} from '../context/global';
import {useEffect,useState} from 'react';


const Shop = () => {


const {filteredproducts, setFilteredproducts} = useAuth();
console.log('filterdproducts',filteredproducts, setFilteredproducts);

    return (
        <div>
            <h1>Shop</h1>
            <h1>{filteredproducts.length}</h1>
        </div>
    );
}

export default Shop;
