const handleproductid = async (product) => {
  // onlysend on colorwith his images  to acart

console.log(product)
//console.log("prodct  ⏩", product);


const selecteditems = {};

selecteditems.id = product.id;
selecteditems.name = product.name;
selecteditems.price = product.price;
selecteditems.image = product.images[0].image;
selecteditems.color = product.images[0].color;
selecteditems.category = product.category;
selecteditems.title = product.title;

  await addtocart(selecteditems);
  await setRefreshcart(!refreshcart);

  setProductid(product.id);

  console.log(carbarsend.length);

  toast.success(`${carbarsend.length} items  in cart`);
};





useEffect(() => {
  if (carbarsend?.length > 0) {
    const hello = carbarsend.filter((item) => {
      return item.id === oneproduct.id;
    });

    if (hello.length > 0) {
      setincart(true);
    } else {
      setincart(false);
    }
    //console.log('hello',hello)
  }
}, [carbarsend]);




console.log("executed user cart");
const userpath = doc(db, "users", `${userinfo?.email}`);
const cart = await (await getDoc(userpath)).data()?.cart;
return cart;