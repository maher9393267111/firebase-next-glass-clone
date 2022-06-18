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

 
const [pro] = useDocumentData(doc(db, "products", productid));

console.log('productid is⏩⏩⏩   :--------->',pro)

  return (


<div>
 
  id is ------- {productid}
  {pro?.name}
</div>

  );
};

export default Product;



