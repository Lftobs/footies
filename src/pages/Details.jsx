import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Products from '../components/Products'
import { cartAtom } from '../store'
import { useAtom } from 'jotai'



const products = [
  { id: 1, name: 'Loafers Foam XV', price: 164.99, img: 'p5.png' },
  { id: 2, name: 'Loafers Foam XI', price: 205.55, img: 'p-null.png' },
  { id: 3, name: 'Loafers Foam XIV', price: 310.12, img: 'p1.png' },
];


const Details = () => {
  const {id} = useParams()  
  const navigate = useNavigate()
  const location = useLocation()
  const currentId = location.state.id 
  const [reloadImg, setReloadImg] = useState(false)
  const page = ''
  const [, setCart] = useAtom(cartAtom);

  const addToCart = (product) => {
    setCart((cart) => {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        return cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...cart, { ...product, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    window.scrollTo(
      {
        top: 0,
        behavior: 'smooth'
      }
    )
    document.querySelector('.deets').style.backgroundImage = `url(${'/' + location.state.img})`
    // document.querySelector('.deets').style.backgroundSize = '100vw ' 
  }, [id])
  return (
    <main className={`w-full flex flex-col items-center text-white`}>
      <header 
        className={`deets flex relative h-[120svh] flex-col items-center w-full bg-no-repeat bg-center max-lg:bg-top bg-cover rounded-b-[2rem] mb-10 max-lg:h-[50svh] max-w-[2000px]    max-lg:p-0 }`}
      >
        <Nav navigate={navigate} page={page}/>
        <nav className='hidden max-lg:flex justify-between items-center px-5 py-5 absolute top-0 w-full'>
          <span onClick={() => navigate('/')}><img src={`${page==='cart' ? '/arr-left-b.png' : "/menu.png" }`} alt="menu" className={`${page==='cart' ?  'h-5 w-8' : 'h-3 w-10'}`} /></span>
          <div className='flex gap-4'>
            <img src='/menu-b.png'  className={` ${page!='cart' && 'hidden'} h-3 w-10`} />
            <img src={`${page==='cart' ? "/search-b.png" : "/search.png"}`} alt="" className=' h-5 w-5'/>
            <img src={`${page==='cart' ? "/cart-b.png" : "/cart.png"}`} onClick={() => navigate('/cart')} alt=""  className=' h-5 w-5'/>
          </div>
        </nav>
        
        <div className='relative h-svh w-full flex max-lg:hidden justify-center max-w-[2000px] '>
          <div className='flex relative self-start justify-between border-b-2 border-white group'>
            <input type="text" name="search" placeholder='Search' id=""  className={`bg-transparent placeholder:text-white text-white text-xl py-4 w-11/12 pr-2 hover:text-right   group-hover:placeholder:text-right outline-none z-50`} onChange={(e) => {
              e.preventDefault
              setSearch(e.target.value)
            }  }/>
            <button><img src='/search.png'/> </button>
          </div>  
        </div>

        <div className=' absolute bottom-10 left-20 w-11/12 max-lg:hidden text-white max-w-[2000px]'>
          <h3 className=' font-medium text-4xl'>{location.state.name}</h3>
          <p className='opacity-90 text-xl'>Men'<s></s></p>
          <p className='font-extrabold text-3xl'>${location.state.price}</p>
        </div>
        
      </header>

      <section className='text-black w-full flex flex-col  items-center max-w-[2000px] '>
          <div className='flex w-11/12 justify-between mb-3 lg:hidden text-black'>
            <div>
              <h3 className=' font-medium text-2xl'>{location.state.name}</h3>
              <p className='opacity-90 text-xl'>Men'<s></s></p>
            </div>
            
            <p className='font-extrabold text-2xl'>${location.state.price}</p>
          </div>
          <div className='flex w-11/12 justify-between max-lg:flex-col-reverse'>
            <div className='flex gap-5 self-start'>
              <div className='flex flex-col gap-3 mt-10 items-center text-semibold'>
                <span className='flex h-14 w-14 rounded-full bg-[rgba(242,238,231,1)]'></span>
                <p>White</p>
              </div>
              <div className='flex flex-col gap-3 mt-10 items-center text-semibold'>
                <span className='flex h-14 w-14 rounded-full bg-[rgba(143,108,62,1)]'></span>
                <p>Brown</p>
              </div>
              <div className='flex flex-col gap-3 mt-10 items-center text-semibold'>
                <span className='flex h-14 w-14 rounded-full bg-black'></span>
                <p>Black</p>
              </div>

            </div>
            <div className='max-w-[34rem] text-balance max-lg:max-w-full'>
              <p className='mb-5 text-right max-lg:text-left'>Through our collections we blur the borders between high fashion and high performance. Like our sneakers by Stella McCartney athletic clothing collection – designed to look the part inside and outside of the gym. Or some of our adidas Originals lifestyle pieces, that can be worn as sports apparel too.</p>
            </div>
          </div>
          <div className='w-11/12 flex justify-start mb-5'>
            <div className='mt-10 flex gap-8 max-lg:flex-col max-lg:hidden'>
              <div className='flex flex-col items-center'>
                <div className='flex  gap-8 '>
                  <p className='font-bold mb-2 text-center'>Size</p>
                  <details className='text-black relative z-10'>
                      <summary></summary>
                      <div className='absolute border-[1px] border-black w-20  rounded-lg -ml-8 backdrop-blur-lg'>
                        <ul className=''>
                          <li className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>1 pair</li>
                          <li className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>2 pair</li>
                          <li className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>3 pair</li>
                          <li className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>4 pair</li>
                        </ul>
                      </div>
                    </details>
                </div>
                <div className='w-[7rem] h-10 grid place-items-center border-[1px] border-black rounded-lg'>
                  <p className='text-center font-bold'>1 pair</p>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='flex  gap-8 '>
                  <p className='font-bold mb-2 text-center'>Quantity</p>
                  <details className='text-black relative z-10'>
                      <summary></summary>
                      <div className='absolute border-[1px] border-black w-20  rounded-lg -ml-8 backdrop-blur-lg'>
                        <ul className=''>
                          <li className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>45 ER</li>
                          <li className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>40 ER</li>
                          <li className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>35 ER</li>
                          <li className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>30 ER</li>
                        </ul>
                      </div>
                    </details>
                </div>
                <div className='w-[7rem] h-10 grid place-items-center border-[1px] border-black rounded-lg'>
                  <p className='text-center font-bold'>45 ER</p>
                </div>
              </div>
              
            </div>
          </div>
          
          <div className='w-11/12 flex justify-start my-8'>
            <button 
              onClick={() => {addToCart({id: id, name: location.state.name, price: location.state.price, img: location.state.img}), navigate('/cart')}}
              className='p-6 mb-3 px-10 max-lg:px-5  border-[1.5px]  border-black rounded-3xl flex items-center gap-5 text-lg '
            >
              Proceed to checkout <img src='/arr-left-b.png' height={40} width={40} className='h-5 -rotate-180 w-10'/>
            </button>
          </div>
      </section>

      <section className='text-black w-full mt-16 flex flex-col items-center  border-t-[1.5px]  border-black max-w-[2000px] '>
        <div className='flex items-center mt-16 w-11/12 justify-between'>
          <p className='text-4xl font-bold max-lg:text-2xl'>Similar product</p>
          <div className='flex text-[rgba(249,126,47,1)] gap-4 justify-center cursor-pointer' onClick={() => navigate('/')}>
            <p>Browse</p>
            <img src="/arr-right-1.png" alt="" className='w-10' />
          </div>
        </div>
        <div className='w-11/12 mt-2'>
          <p className='text-black text-lg w-full text-left'>
            Check out other products.
        </p>
        </div>
        <div className=' w-11/12 max-lg:w-10/12 my-10 grid 2xl:grid-cols-3 max-lg:grid-cols-1 max-lg:place-items-center lg:grid-cols-2 gap-y-5' >
          {
            products.map((product) => (
              <Products product={product}/>
            ))
          }
        </div>

        <footer className='border-t-[1px] w-full mt-20 border-black text-black flex flex-col items-center justify-center'>
          <div className='flex  mt-10 w-11/12 justify-between items-center mb-10  max-lg:hidden'>
            <div className='flex gap-10 '>
              <p>Men</p>
              <p>Women</p>
              <p>Kids</p>
              <p>Bags</p>
            </div>
            <div className='flex relative justify-between border-b-2 border-black group'>
                <input type="text" name="search" placeholder='Search' id=""  className={`bg-transparent placeholder:text-black text-black text-xl py-4 w-11/12 pr-2 hover:text-right   group-hover:placeholder:text-right outline-none z-50`} onChange={(e) => {
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
        
      </section>

    </main>
  )
}

export default Details