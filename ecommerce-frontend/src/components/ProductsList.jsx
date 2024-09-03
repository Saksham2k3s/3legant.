import React from 'react'
import ProductCard from './ProductCard'
import {  useSelector } from 'react-redux'


function ProductsList() {
  const { products } = useSelector(state => state.products);

  
  return (
    <>

    <div className=' hidden lg:block ' >
    <div className='w-full flex flex-row  gap-2 overflow-scroll overflow-y-hidden ' >
      {
        products && products.map((product) => {
           return <ProductCard key={product._id} product = {product} />
        })
      }
    </div>
    </div>

     {/* Products Grid */}
    
    <div className="flex lg:hidden justify-center w-full px-5 mt-5 lg:mt-10 md:px-20 lg:px-40">
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>
   

    </>
  )
}

export default ProductsList