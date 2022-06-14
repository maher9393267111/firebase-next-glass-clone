import React from 'react';
import { useState,useEffect } from 'react';
 import { useStore } from '../recoil/zutsandstore';
import { countState } from '../recoil/listState';
import { useSetRecoilState,useRecoilState  } from 'recoil';

const Newlist = () => {

  const title = useStore(state => state.formState.title);

  const setTitle = useStore(state => state.setTitle);


  

  return (

    
    <div>
      <h1>New List</h1>

      {title}

      <input
          className="w-80  border-2 border-Blue-500 focus:border-Teal-600 text-midnight text-[#18181b] font-serif text-base indent-1  placeholder:text-[#9ca3af] placeholder:text-center italic outline-none"
          type="text"
          placeholder="Ne yapılması gerekiyor ? "
          required
          value={title}
          onChange={setTitle}
        />

<div>
  asas
</div>


    </div>
    
  );
}

export default Newlist;
