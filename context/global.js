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
  
  import { doc, setDoc, getDoc } from "firebase/firestore";
  import { useState } from "react";
  import { useEffect } from "react";
  import { useContext } from "react";
  import { createContext } from "react";
  import { auth, db } from "../firebase";
  
  const authContext = createContext();
  
  export const useAuth = () => {
    return useContext(authContext);
  };
  
  const AuthContext = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [userinfo, setUserinfo] = useState({});
  
    const signUp = async (email, password, name, image) => {
      createUserWithEmailAndPassword(auth, email, password);
  
      // await updateProfile(auth, {
      //     displayName: name,
      //     photoURL: image
      //     });
  
      // set rules read and write if true
      // create  collection name is users --> doc name(id) is user gmail  ----> data is empty array wishlist
      return setDoc(doc(db, "users", email), {
        name: name,
        role: "user",
        watchList: [],
        image: image ? image : 'https://cdn4.iconfinder.com/data/icons/office-thick-outline/36/office-14-256.png',
        email: email,
        password: password,
        cart: [],
        onder: [],
      });
    };
    const signIn = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logout = () => {
      return  signOut(auth);
    };
  
    // sign with google
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider);
    }

    // sign with github
    const signInWithGithub = () => {
      const provider = new GithubAuthProvider();
      return signInWithPopup(auth, provider);
    }

    // sign with facebook
    const signInWithFacebook = () => {
      return signInWithPopup(auth, FacebookAuthProvider);
    }



    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
  
          setUser(user);
          console.log("user status changed: ", user.email, user.uid);
  
          async function fetchuser() {
            if (currentUser) {
              await getDoc(doc(db, "users", currentUser.email)).then((res) => {
                console.log(res.data());
                setUserinfo(res.data());
              });
            }
          }
  
          fetchuser().catch(console.error);
        }
      });
      return unsubscribe;
    }, [currentUser]);
  
    const value = {
      signUp,
      signIn,
      logout,
      currentUser,
      userinfo,
      signInWithGoogle,
      signInWithGithub,
      signInWithFacebook,
    };
    return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
  };
  
  export default AuthContext;