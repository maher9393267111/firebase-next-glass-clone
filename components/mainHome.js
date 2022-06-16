import React from 'react';

const MainHome = () => {
    return (
        <div className=' w-[88%] mx-auto mt-12'>
<div className='wrapper'>

<div className=' flex justify-between  min-h-[420px]'>



{/* info- */}

<div className=' sm:w-full lg:w-1/2 mr-12  mt-12'>

<div>


{/* -big- */}
<div>
    <h1
    className='lg:w-1/2   text-[40px] '
    
    >See everything with Clarity</h1>
</div>

{/* text--- */}

<div>
    <p
    className=' lg:w-[88%]   font-semibold  '
    >Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.</p>
</div>



{/* button- */}


<div className=' -scroll-mt-12'>
    <div>
    <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Show Now</button>
    </div>
</div>



</div>



</div>



{/* -image- */}
<div className=' lg:w-1/2 lg:block sm:hidden'>

    <img src="https://images.unsplash.com/photo-1555274175-75f4056dfd05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
</div>


</div>


</div>

            
        </div>
    );
}

export default MainHome;
