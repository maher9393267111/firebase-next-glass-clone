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
import {fetchUserInfo} from '../store/actions';
import { useDispatch } from "react-redux";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContext = ({ children }) => {

  const dispatch = useDispatch();
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
  const [usercart, setusercart] = useState(false);
  const [productid, setProductid] = useState("");
  const [checexist, setChecexist] = useState(false);
  const [refreshcart, setRefreshcart] = useState(false);
  const [carbarsend, setCarbarsend] = useState([]);
  const [totalprice,setTotalprice] = useState(0);
  const [searchkyword,setSearchkyword] = useState("");
  const [updatedis,setUpdatedis] = useState(false);

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
          console.log(
            "All Filtered---------> products is fetched",
            productsArr,
            ""
          );
        }
      );
    } else {
      const productsRef = collection(db, "products");

      console.log(
        "filtered values------->",
        filterarray.category,
        filterarray.minprice,
        filterarray.maxprice
      );

      const filtrcat =
        filterarray.category == ""
          ? where("category", "in", ["men", "kids", "women"])
          : where("category", "==", `${filterarray.category}`);

      const maxprice = filterarray.maxprice;
      const minprice = filterarray.minprice;

      // switch condition
      let filterprice;
      let filtername;

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
          orderBy("name", "asc")
        ),
        (snapshot) => {
          const productsArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          //  console.log("RESponse", productsArr,'');
          console.log(
            "minprice",
            minprice,
            "maxprice",
            maxprice,
            filterarray.category
          );

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

  // search by name

  const searchByName = (name) => {
    // go to shop page
    // set searchname to name
  };

  // add product to current user cart

  const addtocart = async (product) => {
    // console.log("product", product.id);

    const userpath = doc(db, "users", `${userinfo?.email}`);
    const cart = await (await getDoc(userpath)).data()?.cart;
    // console.log("cart", cart); // cart is an array itis working

    const exist = cart?.filter(
      (item) =>
        // indexof is used to check if the item is already in the cart
        item.id === product.id
    );
    //console.log("exist", exist);

    if (exist?.length === 0 || exist === []) {
      //  console.log("product is notexist in cart add it", exist);

      console.log(checexist);

      product.quantity = 1;

      await updateDoc(userpath, {
        cart: [...cart, product],
        totalprice:  cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) ,
      }).then(async() => {
        const cart = await (await getDoc(userpath)).data()?.cart;
        // update totla price 
        await updateDoc(userpath, {
          totalprice:  cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) ,
        })


      })




      setChecexist(true);

  // total price of the cart
  const totalpriced = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }
    , 0);
  setTotalprice(totalpriced);
  console.log("totalprice when addddddd to cart -------->", totalprice);




    }

    // if exist.length is not 0 and product is exist in the cart  //
    else {
      // console.log("product is exist in cart remove it  ", exist);

      await updateDoc(userpath, {
        cart: cart?.filter((item) => item.id !== product.id), // delete product from cart if exist
        totalprice:  cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) ,

        // onother option  increase the quantity of the product if exist

        // make loop to all cart products and increase the quantity  where product id is equal to the product id in the cart

        // cart: cart.map((item) => {
        //   if (item.id === product.id) {
        //     item.quantity += 1;
        //   }
        //   return item;
        // }),
      });


   // total price of the cart
 const totalpriced = cart.reduce((acc, item) => {
  return acc + item.price * item.quantity;
}
  , 0);
setTotalprice(totalpriced);
console.log("totalprice when addddddd to cart -------->", totalprice);


    }
  };

  // current user cart

  useEffect(() => {
    const usercart = async () => {
      const userpath = doc(db, "users", `${userinfo?.email}`);
      const cart = await (await getDoc(userpath)).data()?.cart;

      console.log("cart is refreshed", cart);

      setusercart(cart);
    };

    const isexist = async () => {
      // chec if product is in the cart by id
      const userpath = doc(db, "users", `${userinfo?.email}`);
      const cart = await (await getDoc(userpath)).data()?.cart;

      const checkglobal = await cart?.filter((item) => item.id === productid);

      //  console.log("checkglobal", checkglobal);

      if (checkglobal?.length === 0 || checkglobal === []) {
        setChecexist(false);
        //console.log("product is notexist in cart global", checkglobal);
      } else {
        setChecexist(true);
        // console.log("product is exist in cart global", checkglobal);
      }
    };

    usercart().then(() => isexist());

    //getusercart()
  }, [userinfo, productid, refreshcart]);

  const getusercart = async () => {
    console.log("executed user cart");
    const userpath = doc(db, "users", `${userinfo?.email}`);
    const cart = await (await getDoc(userpath)).data()?.cart;
    return cart;
  };

  // increase the quantity of the product and update in firebase

  const increaseQuantity = async (product) => {
    const userpath = doc(db, "users", `${userinfo?.email}`);

    const cart = await (await getDoc(userpath)).data()?.cart;

    await updateDoc(userpath, {
      cart: cart.map((item) => {
        if (item.id === product.id) {
          item.quantity += 1;
        }
        return item;
      }),

totalprice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),

    });

    setusercart(cart);

 // total price of the cart
 const totalpriced = cart.reduce((acc, item) => {
  return acc + item.price * item.quantity;
}
  , 0);
setTotalprice(totalpriced);
console.log("totalprice-------->", totalprice);




  };


//- decrtease the quantity of the product and update in firebase

const decreaseQuantity = async (product) => {
  const userpath = doc(db, "users", `${userinfo?.email}`);

  const cart = await (await getDoc(userpath)).data()?.cart;

  await updateDoc(userpath, {
    cart: cart.map((item) => {
      if (item.id === product.id) {

if (item.quantity > 1) {
  item.quantity -= 1;

}

else {
  item.quantity = 1;
}
        
      }
      return item;
    }),
    totalprice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
  });

  setusercart(cart);

  // total price of the cart
  const totalpriced = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }
    , 0);
  setTotalprice(totalpriced);
  console.log("totalprice when decrease-------->", totalprice);



};



// delete the product from the cart and update in firebase

const deleteProductfromCart = async (product) => {  

const userpath = doc(db, "users", `${userinfo?.email}`);

const cart = await (await getDoc(userpath)).data()?.cart;

  await updateDoc(userpath, {
    cart: cart.filter((item) => item.id !== product.id),
    totalprice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
  }).then(async() => {
    const cart = await (await getDoc(userpath)).data()?.cart;


    console.log("cart after delete", cart.length);
    setusercart(cart);
  } );


}



// update user info in firebase

const updateUserInfo = async (userinfo) => {


  const userpath = doc(db, "users", `${userinfo?.email}`);

  await updateDoc(userpath, {
    ...userinfo,
  }).then(async() => {
console.log("user info updated THen🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀");
    // after udpate user info in firebase set it to the state
  const userafterupdated = await (await getDoc(userpath)).data()?.userinfo;
  setUserinfo(userafterupdated);
  setUpdatedis(!updatedis);
  dispatch(fetchUserInfo(userafterupdated));
  console.log('userinfo after update DATA', userinfo?.name);
  });
   

  
  // refresh userinfo when update profile

  // useEffect(() => {


  //    refreshprofile = async () => {
  //     const userpath = doc(db, "users", `${userinfo?.email}`);
  //     const userinfo = await (await getDoc(userpath)).data()?.userinfo;
  //     setUserinfo(userinfo);
  //   }
  //   refreshprofile();
    
  // } , [userinfo,updatedis]);







}




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
    selected,
    setSelected,
    addtocart,
    usercart,
    productid,
    setProductid,
    setRefreshcart,
    refreshcart,
    carbarsend,
    setCarbarsend,
    increaseQuantity,
    decreaseQuantity,
    setTotalprice,
    totalprice,
    deleteProductfromCart ,
    searchkyword,setSearchkyword,
    updateUserInfo, setUpdatedis, updatedis,
  };
  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;
