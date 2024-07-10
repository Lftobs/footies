import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'


const Layout = ({children, page}) => {
  const [search, setSearch ] = useState('')
  const navigate = useNavigate()
  return (
    <>
        <main className={`w-full flex flex-col items-center text-white ${page==='cart' ? 'text-black': 'text-white' }`}>

          
            <header 
              className={`flex flex-col items-center w-full bg-[url("/hero.png")] bg-no-repeat bg-top bg-contain rounded-b-[4rem] max-w-[2000px] bg-[rgba(174,170,165,255)] max-lg:h-auto max-lg:bg-none max-lg:p-0 ${page==='cart' && 'bg-none bg-transparent' }`}
            >
              <div className='hidden max-lg:flex max-lg:flex-col items-center'>
                {page==='cart' && (
                  <div className='my-20'>
                    <h1 className='text-[11rem] font-extrabold text-black max-lg:text-[4rem]'>Checkout</h1>
                  </div>
                )}
                <div className={`relative ${page==='cart' && 'hidden' }`}>
                  <img src='/hero.png' className='h-[43svh] w-full '/>
                    <p className={`text-xs absolute bottom-14 left-10 w-2/3 `}>Through our collections we blur the borders between high fashion and high performance. Like our sneakers by Stella McCartney athletic clothing collection – designed to look the part inside and outside of the gym. Or some of our adidas Originals lifestyle pieces, that can be worn as sports apparel too.</p>
                </div>
                <nav className='flex justify-between items-center px-5 py-5 absolute top-0 w-full'>
                  <span onClick={() => navigate('/')}><img src={`${page==='cart' ? '/arr-left-b.png' : "/menu.png" }`} alt="menu" className={`${page==='cart' ?  'h-5 w-8' : 'h-3 w-10'}`} /></span>
                  <div className='flex gap-4'>
                    <img src='/menu-b.png'  className={` ${page!='cart' && 'hidden'} h-3 w-10`} />
                    <img src={`${page==='cart' ? "/search-b.png" : "/search.png"}`} alt="" className=' h-5 w-5'/>
                    <img src={`${page==='cart' ? "/cart-b.png" : "/cart.png"}`} onClick={() => navigate('/cart')} alt=""  className=' h-5 w-5'/>
                  </div>
                </nav>
                
                
              </div>

              <Nav navigate={navigate} page={page}/>

              {page==='cart' && (
                <div className='my-10 max-[1023px]:hidden'>
                  <h1 className='text-[11rem] font-extrabold text-black max-lg:text-[4rem]'>Checkout</h1>
                </div>
              )}

              <div className={`w-2/3 mt-10 flex flex-col items-center justify-center mb-24 max-lg:hidden max-w-[2000px] ${page==='cart' && 'hidden' }`}>
                <div className='max-lg:hidden'>
                  <img src='/footies.svg' alt='hero' className='max-w-[2000px]' />
                </div>
                <div className={`flex w-full justify-between font-medium max-lg:hidden max-w-[2000px]`}>
                  <div className='max-w-[34rem] text-balance text-lg'>
                    <p className='mb-5'>Through our collections we blur the borders between high fashion and high performance. Like our sneakers by Stella McCartney athletic clothing collection – designed to look the part inside and outside of the gym. Or some of our adidas Originals lifestyle pieces, that can be worn as sports apparel too.</p>
                    <button className='p-6 mb-3 px-10  border-[1.5px] border-white rounded-3xl flex items-center gap-5 text-lg hover:bg-black hover:border-black'>Explore <img src='/arr-r.png' height={40} width={40} className='h-5 w-10'/></button>
                  </div>
                  <div className='flex relative self-end justify-between border-b-2 border-white group'>
                    <input type="text" name="search" placeholder='Search' id="" value={search}  className={`bg-transparent placeholder:text-white text-white text-xl py-4 w-11/12 pr-2 hover:text-right   group-hover:placeholder:text-right outline-none z-50`} onChange={(e) => {
                      e.preventDefault
                      setSearch(e.target.value)
                    }  }/>
                    <button><img src='/search.png'/> </button>
                  </div>
                </div>
              </div>
            </header>          
            {children}
            <footer className='border-t-[1px] w-full border-black text-black flex flex-col items-center justify-center max-w-[2000px] '>
              <div className='flex  mt-10 w-11/12 justify-between items-center mb-10  max-lg:hidden'>
                <div className='flex gap-10 '>
                  <p>Men</p>
                  <p>Women</p>
                  <p>Kids</p>
                  <p>Bags</p>
                </div>
                <div className='flex relative justify-between border-b-2 border-black group'>

                  <p className={`absolute w-11/12 pr-3 left-0 ${search != '' ? 'opacity-0' : 'opacity-100'} top-[30%] text-black text-xl group-hover:text-right `}>Search</p>
                  <input type="text" name="search" id="" value={search}  className={`bg-transparent text-black text-xl py-2 ${search != '' ? 'w-11/12 pr-3' : 'w-3/4 pr-8'}  group-hover:text-right outline-none z-50`} onChange={(e) => {
                    e.preventDefault
                    setSearch(e.target.value)
                  }  }/>
                  <button><img src='/search-b.png'/> </button>
                </div>

                
              </div>

              <div className='w-2/3 max-lg:my-10'>
                <img src='/Footsie.png' alt='hero' className='' />
              </div>
            </footer>
        </main>

    </>
  )
}

export default Layout