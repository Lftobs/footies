import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { cartAtom } from '../store';
import Layout from '../layouts/Layout';
import { cartNo as cartNoAtom } from '../../src/store'
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [err, setErr] = useState('')
  const [cart, setCart] = useAtom(cartAtom);
  const [cartNo, setCartNo] = useAtom(cartNoAtom);
  const total = cart.length != 0 ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0 
  const fee = cart.length != 0 ? 80 : 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.checkValidity()) {
      setShow(true)
      setCart([])
    } else {
      setErr('Error: Invalid input(s)')
    }
    
  }

  const removeFromCart = (item) => {
    setCart((cart) => cart.filter((cartItem) => cartItem.name !== item));
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartNo((prev) => prev - 1);
  };

  const updateQuantity = (qyt, name) => {
    setCart((cart) =>
      cart.map((cartItem) =>
        cartItem.name === name ? { ...cartItem, quantity: qyt } : cartItem
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [setCart]);


  return (
    <Layout page={'cart'}>
      <div className='text-black w-full flex flex-col items-center justify-center max-w-[2000px] '>
        {cart.length === 0 && (
          <div>
            <p className='text-[5rem] font-semibold mb-10 max-lg:text-4xl max-lg:mb-[100%]'> No Item Yet!</p>
          </div>
        )}
        {
          cart.map((item) => (
            <>
              <div className=' flex w-11/12 gap-8 mb-10' key={item.id}>
                <div className='w-[20%] flex justify-start max-lg:w-1/2 max-[800px]:w-[20rem]'>
                  <img src={item.img} alt="" className='w-11/12 max-h-[16rem] rounded-3xl max-[800px]:w-full ' />
                </div>
              <div className='w-[70%] max-lg:w-1/2'>
                <div className='flex justify-between text-[1.3rem] font-medium max-lg:text-right max-lg:text-base'>
                  <div className='max-lg:w-full'>
                    <h1 className='max-lg:text-right max-lg:w-full'>{item.name}</h1>
                    <p>Men's</p>
                  </div>
                  <p className='font-extrabold max-lg:hidden'>${(item.price * item.quantity).toFixed(2) }</p>
                </div>
                <div className='hidden relative w-full max-lg:flex my-4 max-lg:gap-3 max-lg:justify-end max-[800px]:my-2' >
                  <div className='block w-[4rem] '>
                    <div className='w-full h-10 grid place-items-center border-[1px] border-black rounded-lg'>
                      <p className='text-center font-bold'>{item.quantity} pair</p>
                    </div>
                  </div>
                  <div className='block w-[4rem] '>
                    <div className='w-full h-10 grid place-items-center border-[1px] border-black rounded-lg'>
                      <p className='text-center font-bold'>45 ER</p>
                    </div>
                  </div>
                </div>
                <div className='flex gap-5 mt-10 items-center max-lg:mt-8 max-lg:flex-col max-lg:items-end max-lg:pr-4 max-lg:gap-1 max-[800px]:mt-2'>
                  <div className='flex gap-5 mt-2'>
                    <span className='h-11 w-11 rounded-full bg-[rgba(242,238,231,1)] max-lg:h-9 max-lg:w-9'></span>
                    <button className='self-end pb-2 lg:hidden' onClick={() => removeFromCart(item.name)}><img src="/delete.png" alt="delete" className='h-8 w-8' /></button>
                  </div>
                  
                  <p>White</p>
                </div>
                <div className='hidden mt-10 max-lg:flex justify-end max-lg:font-extrabold max-lg:text-2xl max-[800px]:mt-1 max-[800px]:text-xl'>
                  <p>${item.price * item.quantity}</p>
                </div>
                <div className='mt-10 flex gap-8 items-center max-lg:flex-col max-lg:hidden'>
                  <div className='flex flex-col items-center'>
                    <div className='flex  gap-8 '>
                      <p className='font-bold mb-2 text-center'>Size</p>
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
                  <div className='flex flex-col items-center'>
                    <div className='flex  gap-8 '>
                      <p className='font-bold mb-2 text-center'>Quantity</p>
                      <details className='text-black relative'>
                          <summary></summary>
                          <div className='absolute border-[1px] border-black w-20  rounded-lg -ml-8 backdrop-blur-lg'>
                            <ul className=''>
                              {
                                Array(5).fill().map((_, i) => (
                                  <li key={i} onClick={() => updateQuantity(i+1, item.name)} className='mb-2 text-center font-bold py-2 cursor-pointer hover:bg-slate-300'>{i + 1} pair</li>
                                ))
                              }
                             
                            </ul>
                          </div>
                        </details>
                    </div>
                    <div className='w-[7rem] h-10 grid place-items-center border-[1px] border-black rounded-lg'>
                      <p className='text-center font-bold'>{item.quantity} pair</p>
                    </div>
                  </div>
                  <button className='self-end pb-2 max-lg:hidden' onClick={() => removeFromCart(item.name)}><img src="/delete.png" alt="delete" className='h-10 w-10' /></button>
                </div>
              </div>
              </div>
            </>

          ))
        }
        
        {cart?.length != 0 && <p onClick={() => {setCart([]), setCartNo(0), window.scrollTo(0,0)}} className='text-2xl cursor-pointer font-bold my-10 text-[rgba(249,126,47,1)]'>Clear cart</p> }
      </div>
        {cart && (
          <div className='border-black border-t-[1px] pt-16 text-black w-full flex flex-col items-center mb-16 max-w-[2000px] '>
            <div className='w-11/12'>
              <span className=' flex justify-between border-black border-b-[1px] pb-2 mb-2 text-xl'>
                <p>Subtotal</p>
                <p className='font-extrabold'>${total.toFixed(2)}</p>
              </span>
              <span className=' flex justify-between border-black border-b-[1px] pb-2 mb-2 text-xl'>
                <p>Delivery fee</p>
                <p className='font-extrabold'>${fee}</p>
              </span>
              <span className=' flex justify-between pb-2 mb-2 text-xl'>
                <p>Total</p>
                <p className='font-extrabold text-[rgba(249,126,47,1)]'>${(total + fee).toFixed(2)}</p>
              </span>
              
            </div>
            <div className='w-11/12 mt-10'>
              <div className=''>
                <p className='font-bold text-4xl max-w-[26rem] text-balance] mb-5'>Payment Method/delivery route</p>
                <div className='flex gap-5'>
                  <button className='p-6 max-lg:p-4 px-16 bg-[rgba(249,126,47,1)] rounded-3xl flex items-center gap-5 text-lg max-lg:px-10'>card</button>
                  <button className='p-6 max-lg:p-4 px-16 bg-transparent  border-[1.5px] border-black rounded-3xl flex items-center gap-5 text-lg max-lg:px-10'>paypal</button>
                </div>
              </div>
              
              <form action="" className='mt-10' onSubmit={(e) => handleSubmit(e)} noValidate>
              <input type="text"  required name="holder's name" pattern=".{7,}" className='valid:[&:not(:placeholder-shown):not(:focus)]:border-green-600  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-600 h-20 w-full mb-8 px-8 outline-none hover:placeholder:text-right placeholder:text-black border-[1.5px] border-black rounded-3xl max-lg:h-14 max-lg:rounded-xl max-lg:placeholder:text-xs'  placeholder="Cardholder's name" />
              <input type="text" inputMode='numeric' required name="card number" pattern="^\d{10}" className='valid:[&:not(:placeholder-shown):not(:focus)]:border-green-600  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-600 h-20 w-full mb-8 px-8 outline-none hover:placeholder:text-right placeholder:text-black border-[1.5px] border-black rounded-3xl max-lg:h-14 max-lg:rounded-xl max-lg:placeholder:text-xs'  placeholder="Card number" />
                <div className='flex justify-evenly gap-5'>
                  <input type="text" inputMode='numeric' required name="expiration" pattern="^\d{4}" id="" className='valid:[&:not(:placeholder-shown):not(:focus)]:border-green-600 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-600 h-20 w-full mb-8 px-8 outline-none hover:placeholder:text-right placeholder:text-black border-[1.5px] border-black rounded-3xl max-lg:h-14 max-lg:rounded-xl max-lg:placeholder:text-xs'  placeholder='Expiration date' />
                  <input type="text" inputMode='numeric' required name="cvv" pattern="^\d{3}" id="" className=' valid:[&:not(:placeholder-shown):not(:focus)]:border-green-600 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-600 h-20 w-full mb-8 px-8 outline-none hover:placeholder:text-right placeholder:text-black border-[1.5px] border-black rounded-3xl max-lg:h-14 max-lg:rounded-xl max-lg:placeholder:text-xs'  placeholder='CVV Number' />
                </div>
                <input type="text" required name="address" id="" pattern=".{7,}" className=' valid:[&:not(:placeholder-shown):not(:focus)]:border-green-600 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-600 h-20 w-full mb-8 px-8 outline-none hover:placeholder:text-right placeholder:text-black border-[1.5px] border-black rounded-3xl max-lg:h-14 max-lg:rounded-xl max-lg:placeholder:text-xs'  placeholder="House address" />
                <p className='text-red-500 font-bold'>{err}</p>
                <button type='submit' onClick={(e) =>handleClick(e)} className='  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-600 h-20 w-full bg-[rgba(249,126,47,1)] text-base mt-6 text-white mb-8 px-8 outline-none rounded-3xl max-lg:h-14 max-lg:rounded-xl max-lg:placeholder:text-xs'>Place order</button>
              </form>

              <div className='flex text-[rgba(249,126,47,1)] gap-4 justify-center mt-8 cursor-pointer'>
                <p>Browse for more shoes</p>
                <img src="/arr-right-1.png" alt="" className='w-10' />
              </div>
            </div>
          </div>
        )}
      
      <div className={`${show ? 'fixed overflow-hidden flex justify-center items-center h-svh w-full z-50 backdrop-blur-2xl' : 'hidden'}`}>
        <div className=' bg-[rgba(242,238,231,1)] p-14 max-md:px-1 max-lg:w-11/12 rounded-lg text-black grid'>
          <p className='w-auto text-center text-3xl max-lg:text-2xl font-bold mb-5'>Thank you for shopping with us!</p>
          <div className='flex text-[rgba(249,126,47,1)] gap-4 justify-center cursor-pointer' onClick={() => navigate('/')}>
              <p>Browse for more shoes</p>
              <img src="/arr-right-1.png" alt="" className='w-10' />
            </div>
        </div>
      </div>
    </Layout>
    
  );
};

export default Cart;
