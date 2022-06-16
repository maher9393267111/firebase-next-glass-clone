import React from 'react';

const Jumbatron = ({children,title,image}) => {
    return (
        <div>

<div className=" pb-16">
      {/* header- */}

      <div className=" mt-12 ml-12 mr-12 ">
        <div className=" flex justify-between  bg-slate-200  min-h-[410px]">
          <div className="  lg:w-1/2 sm:w-[95%]">
            <h1 className=" relative font-bold text-[37px] text-center top-[38%]">
              {title}
            </h1>
          </div>

          <div className=" lg:w-1/2 lg:block sm:hidden h-[400px]">
            <img
              className=" w-full h-full  object-cover"
              src={image}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

            
        </div>
    );
}

export default Jumbatron;
