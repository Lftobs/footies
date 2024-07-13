import React from 'react'
import { Link } from 'react-router-dom'
import Products from './Products'

const NewArrivials = ({products}) => {
    console.log(products)
  return (
    <>
        <div className='flex gap-14 mt-28 w-full max-2xl:flex-col-reverse max-2xl:items-center'>
            <h1 className='2xl:hidden max-lg:block text-[6rem] font-bold'>Shoes</h1>
            <div className='relative group max-w-[25rem] bg-black overflow-hidden rounded-3xl max-2xl:w-full'>
              <img src={`https://api.timbu.cloud/images/${products[0].photos[0].url}`} alt="" className='group-hover:scale-105 h-full'/>
              <div className='absolute top-10 left-10 text-white cursor-default'>
                <h3 className='text-lg font-medium'>{products[0].name}</h3>
                <p className='opacity-90'>Men'<s></s></p>
                <p className='font-extrabold text-lg'>${products[0].current_price[0].USD[0]}</p>
              </div>
              <div className='absolute flex flex-col items-center bottom-10  text-white w-[25rem] cursor-default'>
                <Link to={`/products/${products[0].id}`} state={{
                    id: products[0].id,
                    name: products[0].name,
                    img: products[0].photos[0].url,
                    price: products[0].current_price[0].USD[0]
                  }}
                  className='flex items-center font-medium mb-3 w-full gap-3 ml-32 hover:opacity-90]'
                >
                  Add to bag <img src="/arr-r.png" alt="" className='w-8 h-4' />
                </Link>
                <h3 className='text-3xl font-bold text-left w-10/12 tracking-widest max-lg:tracking-wide mb-1'>New Arrivals</h3>
                <p className='opacity-90 text-left w-10/12 text-base max-lg:text-xs max-lg:text-balance'>Browser through the available collection or simply search to add to cart quickly!</p>
              </div>
            </div>
            <div className='max-w-[2000px] w-9/12'>
              <div className='cursor-default -mt-36'>
                <h1 className='text-[15rem] max-lg:text-[6rem] max-2xl:text-[13rem] max-2xl:mt-8 font-bold tracking-[-2rem] max-lg:tracking-normal max-lg:hover:tracking-normal hover:tracking-wider text-[rgba(249,126,47,1)]'>Men's</h1>
                <h1 className='text-[15rem] -mt-36 font-bold max-2xl:hidden'>Shoes</h1>
              </div>
              <div className='flex justify-between max-lg:hidden pr-4 w-11/12'>
                {
                  products.slice(1, 3).map((product) => (
                    <Products product={product} />
                  ))
                }
              </div>

              
            </div>
            
        </div>
    </>
  )
}

export default NewArrivials