import React from "react";

import { useAuth } from "../../context/global";

import { query, orderBy, collection, doc } from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { Table } from "antd";

const Step1 = () => {
  const { userinfo } = useAuth();
  const [userdata] = useDocumentData(doc(db, "users", `${userinfo?.email}`));

  const handleCheckout = async () => {
    const stripe = await getStripe();

    console.log(userdata?.cart);

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata?.cart),
    });
    if (response.statusCode === 500) return;

    const data = await response.json();

    //   toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div>
      <div className=" relative">
        {/* -header- */}

        <div className="   top-[-42px] left-[-29px]  font-[600]  absolute ">
          order summary {userdata?.cart.length}
        </div>

        <div>
          <div>
            <div class="relative mt-12 mb-12  left-[-100px] overflow-x-auto w-[1000px]  min-h-[220px]  shadow-md sm:rounded-lg">
              <table class="w-full min-h-[300px] text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Product price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Product image
                    </th>
                    <th scope="col" class="px-6 py-3">
                      product quantity
                    </th>

                    <th scope="col" class="px-6 py-3">
                      Total price
                    </th>

                    <th scope="col" class="px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {userdata?.cart.map((item, index) => (
                    <tr
                      key={index}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td class="px-6 py-4">
                        {" "}
                        <div>{item.name}</div>
                      </td>

                      <td class="px-6 py-4">
                        {" "}
                        <div>{item.price}</div>
                      </td>

                      <td class="px-6 py-4">
                        <div>
                          <img
                            className=" w-10 h-10 rounded-full"
                            src={item?.image}
                            alt=""
                          />
                        </div>
                      </td>

                      <td class="px-6 py-4">
                        {" "}
                        <div>{item.quantity}</div>
                      </td>

                      <td class="px-6 py-4">
                        {" "}
                        <div>{item.quantity * item.price}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="btn-container">
            chekout
            <button type="button" className="btn" onClick={handleCheckout}>
              Pay with Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
