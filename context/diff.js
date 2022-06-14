import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendEmailVerification,
    sendSignInLinkToEmail,
    updateProfile,
  } from "firebase/auth";
  
  import { doc, setDoc, getDoc } from "firebase/firestore";
  import { useState } from "react";
  import { useEffect } from "react";
  import { useContext } from "react";
  import { createContext } from "react";
  import { auth, db } from "../firebase";
  
  const diffContext = createContext();
  
  export const diffcontext = () => {
    return useContext(diffContext);
  };
  
  const allContext = ({ children }) => {
 
  const [show, setShow] = useState(false);
   
  
    const value = {
     show,setShow
    };
    return <diffContext.Provider {...{ value }}>{children}</diffContext.Provider>;
  };
  
  export default allContext;