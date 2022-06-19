import React from "react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import getStripe from '../../lib/getStripe';


import {
  query,
  orderBy,
  collection,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/global";
import { get } from "react-hook-form";
const Step2 = () => {
  const { userinfo } = useAuth();
  const [userdata] = useDocumentData(doc(db, "users", `${userinfo?.email}`));

  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    adress: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChangephone = (phonevalue) => {
    //  console.log("🚀🚀🚀", phonevalue);
    setValues({ ...values, phone: phonevalue });
  };

  // jandle inputs change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    console.log("🚀🚀🚀", values);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    //  console.log("values", values);

    //console.log('userdata', userdata);

    const docRef =
      // await addDoc(collection(db, "orders",  `${userinfo?.email}`)
      await setDoc(doc(db, "orders", `${userinfo?.email}`), {
        user: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        phone: values.phone,
        adress: values.adress,
        city: values.city,
        state: values.state,
        zip: values.zip,
        country: values.country,
        status: "pending",
        cartitems: userdata?.cart,
        total: userdata?.totalprice,
      });


      // reset cart and totalprice after order is placed
      

        // then resset form values
        setValues({
            firstname: "",

            lastname: "",
            email: "",
            phone: "",
            city: "",
            adress: "",
            state: "",
            zip: "",
            country: "",
        });
  };

  return (
    <div>
      <div>
        {/* -header- */}

        <div className=" relative">
          <div className=" absolute  top-[-29px] lg:left-[364px]">
            <h1>Shipping Details {userdata?.cart?.length}</h1>
          </div>

          <div className=" mt-12 mb-12">
            <div>
              <form class="w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      First Name
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="firstname"
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                    />
                    <p class="text-red-500 text-xs italic">
                      Please fill out this field.
                    </p>
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Last Name
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="lastname"
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                    >
                      Address
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="adress"
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      type="text"
                      placeholder="adress"
                    />
                    <p class="text-gray-600 text-xs italic"></p>
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-city"
                    >
                      City
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="city"
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                    />
                  </div>
                  <div class="w-full md:w-1/3 px-3 mt-6 mr-6 mb-6 md:mb-0">
                    {/* <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Phone Number
      </label> */}
                    <div class="relative  lg:-mt-4">
                      <div className="">
                        <PhoneInput
                          country={"us"}
                          value={values.phone}
                          onChange={handleChangephone}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-zip"
                    >
                      Zip
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="zip"
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      placeholder="90210"
                    />
                  </div>
                </div>

                <div className=" mt-6 mb-6">
                  <button
                    onClick={handlesubmit}
                    type="submit"
                    class="text-white  block text-center mt-6 mr-6 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Make Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
