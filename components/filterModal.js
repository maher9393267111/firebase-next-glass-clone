import React from 'react';
import {diffcontext } from '../context/diff';
import { AnimatePresence,motion } from "framer-motion";
const FilterModal = () => {
    const { show,setShow } = diffcontext();
    return (


        
        <div>

            {show &&
        
        <motion.div


        whileInView={
            {opacity: show ? 1 : 0,  transition: {duration: 0.5}}
        }
        
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
    >
        
<div id="defaultModal" tabindex="-1" aria-hidden="true" class="   overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-[255, 255, 255, 0.75]  bg-overlay">
    
   
        <div class="relative
         transform  translate-y-[66px]
        
        bg-white rounded-lg shadow border-2 border-[cadetblue] dark:bg-gray-700  mx-auto  w-[440px] min-h-[300px]">
       
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg
                    
                    onClick={()=>setShow(false)}
                    
                    class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
           {/* ------content- */}
            
            <div className=' min-h-[140px] mx-auto'>
                dsd
            </div>
           
            
        </div>
    
</div>

    </motion.div>
            }
        

        </div>
     
    );
}

export default FilterModal;
