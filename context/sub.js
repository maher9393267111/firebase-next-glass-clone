import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendSignInLinkToEmail,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  orderBy,
  limit,
  query,
  where,
  FieldPath,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth, db } from "../firebase";
import { fetchUserInfo } from "../store/actions";
import { setUserInfo, fetchsingleProduct } from "../store/global";
import { useDispatch } from "react-redux";
import { useAuth } from "./global";

const subContext = createContext();


export const useSub = () => {
    return useContext(subContext);
  };



  const subContextComponent = ({ children }) => {

const {userinfo} = useAuth();
const [cartcahanged, setCartcahanged] = useState(0);
const [cartsub, setCartsub] = useState([]);

   


      const cartlength = async () => {


        const userpath = doc(db, "users", `${userinfo?.email}`);
        const cart = await (await getDoc(userpath)).data()?.cart;

        console.log("cart ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩", cart.length); // cart is an array itis working
setCartcahanged(cart?.length);
// cart is an array itis working

setCartsub(cart);
console.log("cart sub---> ⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩⏩", cartsub); // cart is an array itis working
      }



// cart fetch


;






const [name, setName] = useState("ahmad");

const value ={name, setName, cartlength,cartcahanged,cartsub, setCartsub};

    return <subContext.Provider {...{ value }}>{children}</subContext.Provider>;

  }


  export default subContextComponent;