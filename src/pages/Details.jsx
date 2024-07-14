import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import Nav from '../components/Nav'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Products from '../components/Products'
import { cartAtom, productAtom } from '../store'
import { useAtom } from 'jotai'
import { getProductById, getAllProducts } from '../lib/utilis'



const Details = () => {
  const {id} = useParams()  
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [imgModal, setImgModal] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [cart, setCart] = useAtom(cartAtom);
  const [quantity, setQuantity] = useState(1)
  const page = ''
  const [products] = useAtom(productAtom);
  const [singleProduct, setSingleProduct] = useState([])
  const [, setProductAtom] = useAtom(productAtom);


  const updateQuantity = (qyt) => {
    setQuantity(qyt)
  };


  const addToCart = (singleProduct) => {
    setCart((cart) => {
      const existingItem = cart.find((item) => item.id === singleProduct.id);
      if (existingItem) {
        return cart.map((item) =>
          item.id === singleProduct.id ? { ...item, quantity:  item.quantity + quantity < 5 ? item.quantity + quantity : 1 } : item
        );
      } else {
        return [...cart, { ...singleProduct, quantity: quantity }];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  useEffect(() => { 
    window.scrollTo(0, 0)
    setLoading(true)
    const getData = async () => {
      const data = await getAllProducts();
      
      setProductAtom(data)
      let prod = await getProductById(id)
      setSingleProduct(prod)
      setSingleProduct(prevState => ({
        ...prevState,
        current_price: [
          {
            USD: [
              location.state.price,
              null,
              []
            ]
          }
        ]
      }))
      setDisabled(false)
      // console.log(data, prod, 'prod')

      setTimeout(() => setLoading(false), 5000)
    };
    getData();
    // setLoading(false)

    return () => {
    };

  }, [])

  useEffect(() => {
    window.scrollTo(
      {
        top: -10,
        behavior: 'smooth'
      }
    )
    document.querySelector('.deets').style.backgroundImage = `url(${'https://api.timbu.cloud/images/' + location.state.img})`
  }, [id])
  return (
    <main className={`w-full flex flex-col items-center text-white`}>
      <header 
        className={`deets flex relative h-[110svh] flex-col items-center w-full bg-no-repeat bg-center max-lg:bg-top bg-cover rounded-b-[2rem] mb-10 max-lg:h-[50svh] max-w-[2000px]    max-lg:p-0 }`}
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

        <div className=' absolute bottom-32 left-20 w-11/12 max-lg:hidden text-white max-w-[2000px]'>
          <h3 className=' font-medium text-4xl'>{location.state.name}</h3>
          <p className='opacity-90 text-xl'>Men'<s></s></p>
          <p className='font-extrabold text-3xl'>${location.state.price}</p>
        </div>
        
      </header>

      <section className='text-black w-full flex flex-col  items-center max-w-[2000px] '>
           <div className='flex gap-5 mb-10 '>
            {
              Array(3).fill().map((_, i) => (
                <div onClick={() => setImgModal(true)} key={i}>
                  <img src={`https://api.timbu.cloud/images/${location.state.img}`} alt="" className='h-16 w-24 hover:scale-105'/>
                </div>
              ))
            }
           </div>
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
                  <details className='text-black relative'>
                      <summary></summary>
                      <div className='absolute border-[1px] border-black w-20  rounded-lg -ml-8 backdrop-blur-lg'>
                        <ul className=''>
                          {
                            Array(5).fill().map((_, i) => (
                              <li key={i} onClick={() => updateQuantity(i+1, location.state.name)} className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>{i + 1} pair</li>
                            ))
                          }
                          
                        </ul>
                      </div>
                    </details>
                </div>
                <div className='w-[7rem] h-10 grid place-items-center border-[1px] border-black rounded-lg'>
                  <p className='text-center font-bold'>{quantity} pair</p>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='flex  gap-8 '>
                  <p className='font-bold mb-2 text-center'>Quantity</p>
                  <details className='text-black relative'>
                      <summary></summary>
                      <div className='absolute border-[1px] border-black w-20  rounded-lg -ml-8 backdrop-blur-lg'>
                        <ul className=''>
                          <li className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>45 ER</li>
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
              disabled={false} 
              onClick={() => {addToCart(singleProduct), navigate('/cart')}}
              className={`${disabled && 'opacity-50'} p-6 mb-3 px-10 max-lg:px-5  border-[1.5px]  border-black rounded-3xl flex items-center gap-5 text-lg`}
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
          {loading && (
              <div className='w-4/5 h-[10rem] flex justify-center text-black max-w-[2000px]'>
                <div className='loader mt-32 text-4xl'></div>
              </div>
          )
          }

          {!loading && products.slice(-3).reverse().map((product) => <Products product={product} key={product.id} />)}
          
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
      <section className={`fixed backdrop-blur-3xl ${imgModal ? 'grid': 'hidden'} place-items-center z-50 top-0 h-svh w-full`}>
        
        <div className='w-full flex flex-col justify-center gap-10 items-center text-black'>
          <i onClick={() => setImgModal(false)}><img src="/close.png" alt="close" className='h-10 aspect-square'/></i>
          <img src={`https://api.timbu.cloud/images/${location.state.img}`} alt="" className='w-[38rem] max-h-[40rem] max-lg:max-w-[90%]'/>
        </div>
      </section>
    </main>
    // <p>det</p>
  )
}

export default Details