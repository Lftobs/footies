import { useEffect, useRef, useState } from 'react'
import './App.css'
import Layout from './layouts/Layout'
import Products from './components/Products'
import { json, Link } from 'react-router-dom';
import { getAllProducts } from './lib/utilis';
import NewArrivials from './components/NewArrivials';
import { productAtom } from './store';
import { useAtom } from 'jotai';



function App() {
  const [products, setProducts] = useState([])
  const carousel = useRef()
  const [page, setPage] = useState(0)
  const [newArrivals, setNewArrivals] = useState([])
  const [loading, setLoading] = useState(true)
  const [, setProductAtom] = useAtom(productAtom);
  

  const next = () => {    
    setPage((prev) => prev > 3 ? prev : prev + 3 )
    console.log(page)
  }

  const prev = () => {    
    setPage((prev) => prev === 0 ? 0 : prev - 3 )
    console.log(page)
  }
  
  useEffect(() => {
    window.scrollTo(
      {
        top: 0,
        behavior: 'smooth'
      }
    )
    
    const getData = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setProductAtom(data)
      localStorage.setItem('storeData', data)
      const categories = data.filter(item =>
        item.categories.some(cat => cat.name === 'new')
      );
      setNewArrivals(categories.reverse());
      
    };
  
    getData();
    setTimeout(() => setLoading(false), 5000)
    return () => {
    };
  }, []);
  
  return (
    <>
      <Layout >
        
        {loading && 
          <div className='w-4/5 h-svh flex justify-center text-black max-w-[2000px]'>
            <div className='loader mt-32 text-4xl'></div>
          </div>
        }
        { !loading && <section className='w-4/5 text-black max-w-[2000px]'>
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
          <div className=' my-24 grid 2xl:grid-cols-3 max-lg:grid-cols-1 max-lg:place-items-center lg:grid-cols-2 gap-y-5 w-full ' >
            {
              products.slice(-3).reverse().map((product) => (
                <Products product={product} key={product.id}/>
              ))
            }
          </div>

          <NewArrivials products={newArrivals} />
          
          {/* <div ref={carousel} className='carousel max-2xl:hidden my-16 overflow-scroll pr-[95px] max grid w-full max-w-[100rem]' >
            {
              products.slice(0, 5).reverse().map((product) => (
                <Products product={product}/>

              ))
            }
          </div> */}
          <div className=' my-24 grid 2xl:grid-cols-3 max-lg:grid-cols-1 max-lg:place-items-center lg:grid-cols-2 gap-y-5 w-full ' >
            {
              products.slice(page, page+3).map((product) => (
                <Products product={product}  key={product.id}/>
              ))
            }
          </div>
          
          <div className='text-black w-full mb-10 flex justify-between text-2xl font-semibold max-lg:hidden'>
          <button disabled={page === 0 ? true : false} onClick={() => prev()} className={`flex flex-row-reverse ${page === 0 && 'opacity-0'} gap-5 items-center text-[rgba(249,126,47,1)]`}>
              <p>Previous</p>
              <img src="/arr-right-1.png" alt="" className='h-5 w-10 -rotate-180' />
            </button>
            <button disabled={page === 6 ? true : false} onClick={() => next()} className={`flex ${page===6 && 'opacity-0'} gap-5 items-center text-[rgba(249,126,47,1)] `}>
              <p>Next</p>
              <img src="/arr-right-1.png" alt="" className='h-5 w-10' />
            </button>
          </div>
        </section>
        }
      </Layout>
    </>
  )
}

export default App
