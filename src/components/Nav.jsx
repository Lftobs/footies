import React from 'react'

const Nav = ({navigate, page}) => {
  return (
    <>
    <nav className={`flex justify-between items-center w-11/12 max-w-[2000px] mt-5 py-5 max-lg:hidden ${page==='cart' ? 'text-black' : 'text-white'}`}>
        <div className='max-lg:hidden cursor-pointer' onClick={() => navigate('/')}>
            <h1 className='text-3xl font-bold text-black'>F<span className='text-white'>oo</span>tsie</h1>
        </div>
        <ul className={`flex gap-11  font-semibold max-lg:hidden `}>
            <li className='border-b-2 border-transparent hover:border-[rgba(178,242,82,1)] p-2 cursor-pointer'>Men</li>
            <li className='border-b-2 border-transparent hover:border-[rgba(178,242,82,1)] p-2 cursor-pointer'>Women</li>
            <li className='border-b-2 border-transparent hover:border-[rgba(178,242,82,1)] p-2 cursor-pointer'>Kids</li>
            
        </ul>
        <div 
            className='flex gap-3 font-semibold border-b-2 border-transparent cursor-pointer hover:border-[rgba(178,242,82,1)] p-2 max-lg:hidden'
            onClick={() => navigate('/cart')}                
        >
            <h2>Your bag</h2>
            <img src={`${page==='cart' ? '/cart-b.png' : '/cart.png' }`} alt='cart' width={20} height={20} />
        </div>
    </nav>
    
  </>
  )
}

export default Nav