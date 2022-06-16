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
  const [filterarray, setFilterarray] = useState({
    category: "",
    minprice: 0,
    maxprice: 100000,
    orderby: "",
  });
  const [filteredproducts, setFilteredproducts] = useState([]);
  const [selected, setSelected] = useState({});

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
      query(collection(db, "products"), orderBy("name", "desc")),
      (snapshot) => {
        const productsArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsArr);
      //  console.log("All products is fetched", productsArr, "");
      }
    );
  }, []);

  //-------------------------filtererdproducts-

  useEffect(() => {
    console.log("filterarray", filterarray);
    if (
      filterarray.category == "" &&
      filterarray.minprice == 0 &&
      filterarray.maxprice == 100000 &&
      filterarray.orderby == ""
    ) {
     // console.log("filtered is null fetccccccccccch all");

      onSnapshot(
        query(collection(db, "products"), orderBy("name", "desc")),
        (snapshot) => {
          const productsArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setFilteredproducts(productsArr);
          // console.log(      "All Filtered---------> products is fetched",   productsArr, ""  );
        }
      );
    } 
    
    
    else { 
    
      const productsRef = collection(db, "products");

      console.log(
        "filtered values------->",
        filterarray.category,
        filterarray.minprice,
        filterarray.maxprice
      );

      
const filtrcat = filterarray.category == '' ? where('category', 'in' , ['men', 'kids','women']) :
where('category', '==' , `${filterarray.category}`)



      const maxprice = filterarray.maxprice  
      const minprice = filterarray.minprice  


// switch condition
let filterprice 
let filtername

switch (filterarray.orderby) {
  case "asc-price":
    console.log("asc-price");
   filterprice = orderBy("price", "asc"); 
      filtername = orderBy("name", "asc");
   
  
    break;

  case "desc-price":

    filterprice = orderBy("price", "asc"); 
      filtername = orderBy("name", "asc");


    break;
    case "asc":
      filterprice = orderBy("price", "asc");
      filtername = orderBy("name", "asc");

      break;
    case "desc":
      filterprice = orderBy("price", "desc");
      filtername = orderBy("name", "desc");

  default:
    break;
}





 console.log("orderfilter______________", filterprice, filtername);


      onSnapshot(
        query(
          collection(db, "products"),
           filtrcat,
         
          where("price", ">", `${minprice} `),
          where("price", "<", `${maxprice}`),
          orderBy("price", "asc"),
            orderBy("name", 'asc')
          ,
        ),
        (snapshot) => {
          const productsArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          //  console.log("RESponse", productsArr,'');
          console.log("minprice", minprice,'maxprice',maxprice,filterarray.category);

          setFilteredproducts(productsArr);
          console.log(
            " Filtered---------> products is fetched",
            filteredproducts,
            ""
          );
        }
      );

   
    }
  }, [filterarray]);

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
    filterarray,
    setFilterarray,
    filteredproducts,
    setFilteredproducts,
    selected, setSelected
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
