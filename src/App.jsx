import { useEffect, useState } from 'react'
import './App.css'
import Layout from './layouts/Layout'
import Products from './components/Products'
import { Link } from 'react-router-dom';


const products = [
  { id: 1, name: 'Loafers Foam XV', price: 164.99, img: 'p5.png' },
  { id: 2, name: 'Loafers Foam XI', price: 205.55, img: 'p-null.png' },
  { id: 3, name: 'Loafers Foam XIV', price: 310.12, img: 'p1.png' },
];

function App() {
  
  useEffect(() => {
    window.scrollTo(
      {
        top: 0,
        behavior: 'smooth'
      }
    )
    
    // document.querySelector('.deets').style.backgroundSize = '100vw ' 
  }, [])
  

  return (
    <>
      <Layout >
        <section className='w-4/5 text-black max-w-[2000px]'>
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

          <div className='flex gap-14 mt-28 w-full max-2xl:flex-col-reverse max-2xl:items-center'>
            <h1 className='2xl:hidden max-lg:block text-[6rem] font-bold'>Shoes</h1>
            <div className='relative group max-w-[25rem] bg-black overflow-hidden rounded-3xl max-2xl:w-full'>
              <img src="/p2.png" alt="" className='group-hover:scale-105 h-full'/>
              <div className='absolute top-10 left-10 text-white cursor-default'>
                <h3 className='text-lg font-medium'>Loafers Foam XVII</h3>
                <p className='opacity-90'>Men'<s></s></p>
                <p className='font-extrabold text-lg'>1250.05</p>
              </div>
              <div className='absolute flex flex-col items-center bottom-10  text-white w-[25rem] cursor-default'>
                <Link to={'/products/10'} state={{
                    id: 10,
                    name: 'Loafers Foam XVII',
                    img: 'p2.png',
                    price: 1250.05
                  }}
                  className='flex items-center font-medium mb-3 w-full gap-3 ml-32 hover:opacity-90]'
                >
                  Add to bag <img src="/arr-r.png" alt="" className='w-8 h-4' />
                </Link>
                <h3 className='text-3xl font-bold text-left w-10/12 tracking-widest max-lg:tracking-wide mb-1'>New Arrivals</h3>
                <p className='opacity-90 text-left w-10/12 text-base max-lg:text-xs max-lg:text-balance'>Browser through the available collection or simply search to add to cart quickly!</p>
              </div>
            </div>
            <div>
              <div className='cursor-default -mt-36'>
                <h1 className='text-[15rem] max-lg:text-[6rem] max-2xl:text-[13rem] max-2xl:mt-8 font-bold tracking-[-2rem] max-lg:tracking-normal max-lg:hover:tracking-normal hover:tracking-wider text-[rgba(249,126,47,1)]'>Men's</h1>
                <h1 className='text-[15rem] -mt-36 font-bold max-2xl:hidden'>Shoes</h1>
              </div>
              <div className='flex gap-40 px-12 max-lg:hidden'>
                {
                  [{id: 4, name: 'Loafers Foam VII', img: 'p3.png', price: 852.18 }, {id: 4, name: 'Loafers Foam XVI', img: 'p4.png', price:689.12 }].map((product) => (
                    <Products product={product} />
                  ))
                }
              </div>
            </div>
            
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
