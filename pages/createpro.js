import React from 'react';
import { useState, useRef } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString,getStorage } from "firebase/storage";



const CreateProducts = () => {

    const [productinfo, setProductinfo] = useState("");
    const [productimage, setproductimage] = useState("");
    const [childtcategory, setchildcategory] = useState([]);
    const [selectedcategory, setselectedcategory] = useState("");
  
    const [images, setImages] = useState([]);





    const handleImageChange = async (e) => {

        e.preventDefault();

        // multiple images  change to object url
          let reader = new FileReader();
          let files = e.target.files;
          console.log('files', files)
          for (let i = 0; i < files.length; i++) {
            reader.readAsDataURL(files[i]);
            reader.onload = () => {
              // setImages({
              //   ...images,
              //   [files[i].name]: reader.result
              // });
        
              setImages([...images, reader.result]);
              console.log('images', images)
             
            }
          }
        
//---------------------------------------------------------------------------------------------------------------------

        // const file = e.target.files[0];
        // console.log(file);
    
        // const storage = getStorage();
        // const testRef = ref(storage, `childcategories/${file.name}`);
        // console.log("testRef", testRef);
        // // send image file to storage with test ref info
        // await uploadBytes(testRef, file).then((snapshot) => {
        //   console.log("Uploaded image to storage success!");
        // });
    }


// send array of images to storage and get url

const uploadImages = async () => {

for (let i = 0; i < images.length; i++) {

  const storage = getStorage();
  const testRef = ref(storage, `productimagesarray/image${i}`);
  console.log("testRef", testRef);
  // send image file to storage with test ref info
  await  uploadString(testRef, images[i], "data_url").then((snapshot) => {
    console.log("Uploaded image to storage success!");
  });
}


}




    return (
        <div>
            
<input
onChange={handleImageChange}
type="file" multiple={true} />


{images.length}

<button

onClick={uploadImages}
>upoad images</button>



        </div>
    );
}

export default CreateProducts;
