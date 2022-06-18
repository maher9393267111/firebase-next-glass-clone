import React from 'react';
import Link from 'next/link';
const ProductMaincart = ({product}) => {
    return (
        <div>
            
<div className=' border-2  border-slate-400'>

{/* --img- */}

<div
className ='w-full h-[255px]'>

 <Link href={`/product/${product.id}`}>
<img 
className=' w-full h-full    transition-all  duration-200    hover:rotate-6'
src={product.images[0].image} alt="" />
</Link>
</div>

{/* info- */}
<div className=' mt-4 mb-4 ml-6 info'>

<div className=''>

<p className=' text-xl font-semibold'>{product.name}</p>

<p
className=' text-xl font-semibold'
>{product.category}</p>
</div>


</div>



</div>

        </div>
    );
}

export default ProductMaincart;
