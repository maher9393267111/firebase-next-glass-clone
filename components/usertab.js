import React from 'react';
import { useAuth } from '../context/global';
import { useRouter } from 'next/router'
import Link from 'next/link';
const Usertab = () => {

const {userinfo} = useAuth();

    return (
        <div>
          <div>


{/* --cover- */}
<div className=' relative'>

<img
className=' w-full h-[222px] object-cover'
src="https://salinaka-ecommerce.web.app/images/defaultBanner.accdc757f2c48d61f24c4fbcef2742fd.jpg" alt="" />


{/* ----user image--- */}

<div className=' user-image relative flex justify-between ml-4 mr-4'>


<img class="w-24 h-24p-1 rounded-full relative avatar-user  " src={userinfo?.image} alt="Bordered avatar"></img>


<div  className=' relative top-[-25px]'  >
<button type="button" class="h-12 text-white flex gap-2 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">



<p>

<Link href="/edituser">
<a className='text-white'>Edit Profile</a>
</Link>


</p>

</button>
</div>



</div>


</div>




{/* -------user info-- */}


<div className=' mt-6   text-[15px]'>


<div>
    <h1 className=' text-xl  font-semibold'>

{userinfo?.name}

    </h1>

<div>

<p>Email</p>

<p className='mt-4'>{userinfo?.email}</p>


{userinfo?.address ? <p className='mt-4'>{userinfo.adress}</p> : <p className='mt-4'>No address yet</p>}



<p>Mobile</p>

<p>{userinfo?.mobile }</p>







</div>


</div>


</div>



          </div>


        </div>
    );
}

export default Usertab;
