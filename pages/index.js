import Head from 'next/head'
import Image from 'next/image'
import  '../styles/Home.module.css'
import { useState,useEffect } from 'react'
import { Button } from 'antd';

import Modal from "react-modal";
import { useAuth } from '../context/global';
import {diffcontext } from '../context/diff';



export default function Home() {


const [open, setOpen] = useState(false);
const { show,setShow } = diffcontext();


const { logout  } = useAuth();
const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
     {/* { !isSSR &&  <NewList />} */}
  }, []);











  return (
    <div className=''>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



<div>
<Button
onClick={() => setShow(true)}

type="primary">Text Button</Button>
</div>


{show ? <div>Modal open</div> : <div>Modal closed</div>}
     

 




    </div>
  )
}
