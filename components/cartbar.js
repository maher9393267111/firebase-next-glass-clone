import React from 'react';
import { Button, Drawer } from 'antd';
import {useState, useEffect} from 'react';
import { diffcontext } from '../context/diff';
import { useAuth } from '../context/global';
import CartItem  from './cartitem';


const Cartbar  = () => {

  const [cartitems, setCartitems] = useState([]);
  const {showDrawer, onClose,visible} = diffcontext();
  
  const {usercart,setCarbarsend} = useAuth();

   
  useEffect(() => {

  //  if(usercart.length > 0){


      setCartitems(usercart);
      setCarbarsend(usercart);
      console.log('cart cartbar----->',cartitems);


   // }
  }, [usercart,showDrawer]);



  
  
  
    return (
      <>
        {/* <Button type="primary" onClick={showDrawer}>
          Open
        </Button> */}
        <Drawer 

width={520}
style = {{transition : ' all2.5s  ease-in-out'}}

        className='  transition-all   duration-500'
        title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
        

{/* ----content- */}


<div>


<h1>{cartitems?.length}</h1>
<div>

{ cartitems && cartitems.length >0 &&   cartitems.map((item,index)=>{
return (
<div>

<CartItem item={item} key={index}/>

</div>


)})}


</div>


</div>


        </Drawer>
      </>
    );
  };
  
  export default Cartbar;