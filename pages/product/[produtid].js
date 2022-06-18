import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  doc,
  collection,
  getDocs,
  limit,
  orderBy,
  where,
  query,
  collectionGroup,
  getDoc,
} from "firebase/firestore";
import {db} from '../../firebase'
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuth } from "../../context/global";
const Product = ({id}) => {
  const { singleproduct, oneproduct } = useAuth();

  const router = useRouter();

  const productid = router.query.produtid;

  const [product, setProduct] = useState({});
 
// const [pro] = 
// console.log('pro is :--------->⏩',pro)


const fetchproduct = async () => {

await getDoc(doc(db, "products", productid)).then((docSnap) => {
  setProduct(docSnap.data());

  console.log('product information is- :--------->⏩',product)
}
);


}





// if there params fetch product from firebase

useEffect(() => {
if (productid)
{
 
  console.log('id is changeddd--->⏩⏩⏩   :--------->',productid)
  fetchproduct();


}


}, [productid]);


  return (


<div>
 
  id is ------- {productid}
  

{product !== {} ? (<div>{product?.name}</div>) : (<div>No product data here</div>)}

</div>

  );
};

export default Product;



