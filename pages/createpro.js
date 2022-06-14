import React from "react";
import { useState, useRef } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadString,
  getStorage,
  uploadBytes,
} from "firebase/storage";
import { async } from "@firebase/util";

const CreateProducts = () => {
  const [productinfo, setProductinfo] = useState("");
  const [productname, setProductname] = useState("");
  const [productprice, setProductprice] = useState("");

  const [productimagesurl, setproductimagesurl] = useState("");
  const [childtcategory, setchildcategory] = useState([]);
  const [selectedcategory, setselectedcategory] = useState("");
  const [fileurl, setfileurl] = useState("");
  const [images, setImages] = useState([]);

  const handleimages = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    // generate a random string
    const random =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const testRef = ref(storage, `PRODUCTS/${random}`);

    await uploadBytes(testRef, file).then((snapshot) => {
      console.log("Uploaded image to storage success!");
    });

    // get image url from storage and set into state
    const down = await getDownloadURL(testRef);
    //setproductimage(down);

    setImages([...images, down]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: productname,
      price: productprice,
      images: images,
    };

    const docRef = await addDoc(collection(db, "products"), product);
  };

  return (
    <div>
      <div>
        <h1>name</h1>
        <input onChange={(e) => setProductname(e.target.value)} type="text" />
      </div>

      <div>
        <h1>price</h1>
        <input
          onChange={(e) => setProductprice(e.target.value)}
          type="number"
        />
      </div>

      <div>
        <h1>product category</h1>
        <input onChange={(e) => setProductname(e.target.value)} type="text" />
      </div>

      <input onChange={handleimages} type="file" multiple={true} />

      {images.length}

      {/* <button

onClick={uploadImages}
>upoad images</button> */}

      <div>
        images
        <div className=" flex  gap-9">
          {images.map((image, index) => {
            return (
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={image}
                alt=""
              />
            );
          })}
        </div>
      </div>

<div>
  <button
  onClick={handleSubmit}
  
  >create</button>
</div>


    </div>
  );
};

export default CreateProducts;
