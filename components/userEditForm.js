import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/global";
import PhoneInput from "react-phone-input-2";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";


const UserEditForm = ({ coverimage, userimage }) => {
  const { userinfo, updateUserInfo } = useAuth();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [responsesuer, setResponseimage] = useState("");
  const [responsecover, setResponsecover] = useState("");

  const handleChange = (phonevalue) => {
    //  console.log("🚀🚀🚀", phonevalue);
    setPhone(phonevalue);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

//     const imageRef = ref(storage, `users/${userinfo?.name}/coverimage`);

//     if (coverimage) {
//    //   console.log("coverimage well uploaded");
//       await uploadString(imageRef, coverimage, "data_url").then(async () => {
//         const coverURL = await getDownloadURL(imageRef);
//         setResponsecover(coverURL);
//       });
//     }

//    // console.log("coverimage🚀🚀🚀🚀🚀🚀🚀🚀🚀", responsecover);
//     const userimageRef = ref(storage, `users/${userinfo?.name}/userimage`);

//     if (userimage) {
//      // console.log("userimage well uploaded");
//       await uploadString(userimageRef, userimage, "data_url").then(async () => {
//         const userURL = await getDownloadURL(userimageRef);
//         setResponseimage(userURL);
//       });
//     }










    const userobject = {
      name,
      phone,
      password,
      email,
      adress,
      coverimage: coverimage || userinfo?.coverimage,
  
      image:  userimage  || userinfo?.image,
    };

    console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀',userobject);

     await updateUserInfo(userobject).then(() => {
        //reset form
        const formid = document.getElementById("form-controller");
        formid.reset();
     })


  };

  return (
    <div>
      <h1 className=" text-xl text-center mx-auto w-[200px]  p-2 rounded-full bg-green-400 text-white font-semibold">
        UserEditForm{" "}
      </h1>

      <div>
        <form id='form-controller' className=" pb-12">
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required=""
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light
"
              required=""
            />
          </div>
          <div class="mb-6">
            <label
              for="repeat-password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="repeat-password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required=""
            />
          </div>

          {/* ---adress- */}

          <div class="mb-6">
            <label
              for="repeat-password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              adress
            </label>
            <input
              onChange={(e) => setAdress(e.target.value)}
              type="text"
              id="repeat-password"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required=""
            />
          </div>

          <div className="mb-6">
            <PhoneInput country={"us"} value={phone} onChange={handleChange} />
          </div>

          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required=""
              />
            </div>
            <label
              for="terms"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                class="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <button
            onClick={handlesubmit}
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new account
          </button>
        </form>
      </div>

      <div className="flex gap-6">
        <img className="w-6 h-6" src={responsesuer} alt="" />

        <img className=" h-6 w-6" src={responsecover} alt="" />
      </div>
    </div>
  );
};

export default UserEditForm;
