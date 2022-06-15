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
    const {registerwithinputs,setregisterwithinputs} = useState(false);



    const signUp = async (email, password,name) => {
      createUserWithEmailAndPassword(auth, email, password);
  
  console.log('signUp',email, password,name)

  


  
};



    

   




    const signIn = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logout = () => {
      console.log("logout");
      setUser({});
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
            if (user) {
              console.log(`currentUser: ${user.email}`);


await getDoc(doc(db, "users", user.email)).then((userdata) => {

//console.log('userdata',userdata)
  setUserinfo(userdata.data());
  console.log('userinf------->>>',userinfo);

}
)



            
            }
          }
  
          fetchuser().catch(console.error);
        }
      });
      return unsubscribe;
    }, [currentUser,auth]);
  
    const value = {
      signUp,
      signIn,
      logout,
      currentUser,
      userinfo,
      signInWithGoogle,
      signInWithGithub,
      signInWithFacebook,
      createUserWithEmailAndPassword
    };
    return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
  };
  
  export default AuthContext;