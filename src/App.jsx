import { useState } from 'react'
import './App.css'
import Layout from './layouts/Layout'
import Products from './components/Products'


const products = [
  { id: 1, name: 'Loafers Foam XV', price: 164.99, img: 'p5.png' },
  { id: 2, name: 'Loafers Foam XI', price: 205.55, img: 'p-null.png' },
  { id: 3, name: 'Loafers Foam XIV', price: 310.12, img: 'p1.png' },
];

function App() {

  

  return (
    <>
      <Layout >
        <section className='w-4/5 text-black'>
          <div className='my-10 flex justify-between max-lg:items-center'>
            <div className=''>
              <h1 className='text-4xl font-bold mb-2 max-lg:text-xl max-lg:mb-0'>Trending now</h1>
              <p className='text-balance max-w-[30rem] max-lg:hidden'>Discover the perfect blend of timeless style, quality, and  performance. Shop fotsie shoes, sneakers and gear.</p>
            </div>

            <div className='flex flex-row items-center gap-3'>
              <p className='text-[rgba(249,126,47,1)] font-semibold'>Sort by</p>
              <img src='/arr-down.png' height={30} width={30}/>
            </div>
            
          </div>
          <div className=' my-10 grid 2xl:grid-cols-3 max-lg:grid-cols-1 max-lg:place-items-center lg:grid-cols-2 gap-y-5 w-full ' >
            {
              products.map((product) => (
                <Products product={product}/>
              ))
            }
          </div>

          <div className=' my-10 grid 2xl:grid-cols-3 max-lg:grid-cols-1 max-lg:place-items-center lg:grid-cols-2 gap-y-5 w-full ' >
            {
              products.map((product) => (
                <Products product={product}/>
              ))
            }
          </div>
        </section>
      </Layout>
    </>
  )
}

export default App
