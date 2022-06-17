import React from 'react';
import {useEffect, useState} from 'react';
import { AnimatePresence,motion } from "framer-motion";
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import {useAuth} from '../context/global';

const Userporfile = () => {

    const  [activepanel, setActivepanel] = useState('1');

    const {userinfo} = useAuth();
    const onChange = (key) => {
        console.log(key);
        setActivepanel(key);
      };

    return (
        <div>
            <h1>Userporfile</h1>
            <AnimatePresence>
            <div className=' w-[66%] mx-auto min-h-[300px] border-2 '>

       
            <Tabs onChange={onChange} type="card">

         

    <TabPane tab="Tab 1" key="1">

    <motion.div
                
                initial={{opacity: 0, x: [100]}}
                animate={{opacity: 1 , x : activepanel === '1' ? 0 : 255}}
                exit={{opacity: 0}}
                transition={{duration: 1}}
            >
    Content of Tab Pane 1
                </motion.div>





  
    </TabPane>
    <TabPane tab="Tab 2" key="2">
    <motion.div
                
                initial={{opacity: 0, x: [100]}}
                animate={{opacity: 1 , x : activepanel === '2' ? 0 : 255}}
                exit={{opacity: 0}}
                transition={{duration: 1}}
            >
    Content of Tab Pane 2
                </motion.div>





     
    </TabPane>
    <TabPane tab="Tab 3" key="3">
    <motion.div
                
                initial={{opacity: 0, x: [100]}}
                animate={{opacity: 1 , x : activepanel === '3' ? 0 : 255}}
                exit={{opacity: 0}}
                transition={{duration: 1}}
            >
    Content of Tab Pane 3
                </motion.div>




    
    </TabPane>
   
  </Tabs>
  
            </div>
            </AnimatePresence>
        </div>

    );
}

export default Userporfile;
