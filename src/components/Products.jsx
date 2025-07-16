import React, { useEffect, useState } from 'react'
import { cartAtom, cartNo as cartNoAtom } from '../store'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'



const Products = ({product}) => {
    const [cart, setCart] = useAtom(cartAtom);
    const [cartNo, setCartNo] = useAtom(cartNoAtom)
    const navigate = useNavigate()
    const [hold, setHold] = useState(false)
    const [img, setImg] = useState([])
    
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setHold(true)
        setCart((cart) => {
          const existingItem = cart.find((item) => item.id === product.id);
          if (existingItem) {
            
            return cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            setCartNo(prev => prev + 1)
            return [...cart, { ...product, quantity: 1 }];
          }
          
        });
        
        setTimeout(() => {
          setHold(false)
        }, 1000)
      };
  return (
    <>
    <div className=' w-[25rem] max-w-[25rem] max-lg:w-full ' key={product.id}>
        <div className='relative group max-w-[24.8rem] bg-[rgba(242,238,231,1)] min-h-[23rem] max-lg:min-h-[17rem] overflow-hidden rounded-3xl max-lg:w-full' >
            <img 
              src={`/${product.img}`} alt="Produt" className='lg:h-[24rem] w-full max-lg:h-[17rem] group-hover:scale-105' 
              onClick={() => {
                navigate(`/products/${product.id}`, 
                { state: {
                  id: product.id,
                  name: product.name,
                  img: product.img,
                  price: product.price},
                  // data: data 
                }
              ), window.scrollTo(0, 0)}}
              />
            <div className='absolute bottom-10 left-10 text-white cursor-default'>
                <h3 className='text-lg font-medium'>{product.name}</h3>
                <p className='opacity-90'>Men'<s></s></p>
                <p className='font-extrabold text-lg'>${product.price}</p>
            </div>
        </div>
        
        <div className='mt-5'>
            <button
                onClick={() => {addToCart(product) } } 
                disabled={hold}
                className='outline-none group transition-all hover:bg-[rgba(249,126,47,1)] hover:text-white max-lg:w-full max-lg:justify-center max-lg:bg-[rgba(249,126,47,1)] max-lg:text-white py-4 px-10 rounded-2xl flex items-center gap-4 text-[rgba(249,126,47,1)] text-lg font-medium'
            >
                {hold ? 'Item added' : 'Add to bag'} 
                <span className='h-5 w-10 bg-[url("/arr-right-1.png")] bg-no-repeat bg-contain group-hover:bg-[url("/arr-r.png")] max-lg:bg-[url("/arr-r.png")]'/>
            </button>
        </div>
    </div>

    
    </>
  )
}

export default Products
