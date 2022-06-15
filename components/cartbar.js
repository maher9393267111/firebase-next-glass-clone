import React from 'react';
import { Button, Drawer } from 'antd';
import {useState, useEffect} from 'react';
import { diffcontext } from '../context/diff';
const Cartbar  = () => {
  
  
  
    const {showDrawer, onClose,visible} = diffcontext();
  
    return (
      <>
        {/* <Button type="primary" onClick={showDrawer}>
          Open
        </Button> */}
        <Drawer 

style = {{transition : ' all2.5s  ease-in-out'}}

        className='  transition-all   duration-500'
        title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  };
  
  export default Cartbar;