// import React from 'react';
// import { doc, setDoc, getDoc,collection,onSnapshot,orderBy,limit ,query} from "firebase/firestore";
// import { auth, db } from "../firebase";
// import { useState,useEffect } from "react";
// const Productsfetching = () => {
    
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//          onSnapshot(
//         query(collection(db, "products"),
//          orderBy('name', 'desc')
//          )
//          ,
//         (snapshot) => {
//             setProducts(snapshot.docs)
//             console.log('All products is fetched',snapshot.docs)
//         }
//     )
//       }
// ,[db])


        
// return (

//     products
// )






    
// }

// export default Productsfetching;
