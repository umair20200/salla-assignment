import React from 'react'
import { Product } from './product'
import { PRODUCTS } from '../constant'
import { useState } from 'react'

export const Shop = (props) => {

  const [productList] = useState(props.products||[]);
  return (
    <main className="w-full main flex-auto">
  <div className="container">
    <div className="p-2 sm:p-4 bg-white rounded-lg shadow-4xl">
      {/* <!-- slider --> */}
      <div className="w-full  bg-gray-100 rounded-lg mb-8">
        <img src="images/main-slider/01.png" className="w-full aspect-video rounded-lg" alt="" />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 sm:gap-4">
      {productList.map((product) => (
          <Product key={product.id} data={product} />
        ))} 
      </div>
    </div>
  </div>
</main>
  )
}


