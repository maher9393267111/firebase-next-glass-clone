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
} from "firebase/firestore";
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
  const [reg, setreg] = useState(false);
  const [products, setProducts] = useState([]);
  
  const [queryproducts, setQueryproducts] = useState([]);

  const signUp = async (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password);

    console.log("signUp", email, password, name);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    console.log("logout");
    setUser({});
    return signOut(auth);
  };

  // sign with google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

    // add the user to the users collection

    await setDoc(doc(db, "users", auth.currentUser.email), {
      watchList: [],
      name: auth.currentUser.displayName,
      role: "user",
      image: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      password: "",
      cart: [],
      order: [],
    });
  };

  // sign with github
  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider);

    await setDoc(doc(db, "users", auth.currentUser.email), {
      watchList: [],
      name: auth.currentUser.displayName,
      role: "user",
      image: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      password: "",
      cart: [],
      order: [],
    });
  };

  // sign with facebook
  const signInWithFacebook = async () => {
    await signInWithPopup(auth, FacebookAuthProvider);
    await setDoc(doc(db, "users", auth.currentUser.email), {
      watchList: [],
      name: auth.currentUser.displayName,
      role: "user",
      image: auth.currentUser.photoURL,
      email: auth.currentUser.email,
      password: "",
      cart: [],
      order: [],
    });
  };

  // reset password
  const forgetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log(` Email Sent to ${email}`);
        //  handleOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.

        setUser(user);
        //  console.log("user status changed: ", user.email, user.uid);

        async function fetchuser() {
          if (user) {
            //  console.log(`currentUser: ${user.email}`);

            await getDoc(doc(db, "users", user.email)).then((userdata) => {
              //console.log('userdata',userdata)
              setUserinfo(userdata.data());
              //  console.log("userinf------->>>", userinfo);
            });
          }
        }

        fetchuser().catch(console.error);
      }
    });
    return unsubscribe;
  }, [currentUser, auth]);


  useEffect(() => {
    console.log("executed");
    onSnapshot(
      query(collection(db,"products"), orderBy("name", "desc")
      ),
      (snapshot) => {
        const productsArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProducts(productsArr);
        console.log("All products is fetched", productsArr,'');
      }
    );


  }, []);








// deneme----

useEffect(() => {
 
  // find by product name with regex
  const collecref = collection(db, "products");
  
const queryname ='kidrad'


 const collectionref =  query(collection(db, "products"), where("name", "==", `kidrad` ))
 

 var q1 = query(collection(db, "products"), where("name", "==", `kidrad` ))

var q2 = query(collection(db, "products"), where("category", "==", `men` ))





 getDocs(q2)
 .then(response => {
     const products = response.docs.map(doc => {
         return { id: doc.id, ...doc.data() }
     })
     console.log('QUERY{1}---------->',products)
     setQueryproducts(products)
     
 })
 .then(() => {

  getDocs(q1)
  .then(response => {
      const products = response.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
      })
      console.log('QURY{2}---------->',products)
      setQueryproducts([...queryproducts, ...products])
     
    } ) } )
 
 
 .catch(err => {
     console.log(err)
 }).finally(() => {
 })





}, []);














  const value = {
    signUp,
    signIn,
    logout,
    currentUser,
    userinfo,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    createUserWithEmailAndPassword,
    reg,
    setreg,
    forgetPassword,
    products,
    setProducts,
    queryproducts,
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
