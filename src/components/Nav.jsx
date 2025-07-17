import { useAtom } from "jotai"
import { cartNo as cartNoAtom } from "../store"

const Nav = ({navigate, page}) => {
	const [cartNo, setCartNo] = useAtom(cartNoAtom)
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
				className='flex gap-3 font-semibold border-b-2 border-transparent cursor-pointer hover:border-[rgba(178,242,82,1)] p-2 max-lg:hidden relative'
				onClick={() => navigate('/cart')}                
			>
				<h2>Your bag</h2>
				<div className='relative'>
					<img src={`${page==='cart' ? '/cart-b.png' : '/cart.png' }`} alt='cart' width={20} height={20} />
					{cartNo > 0 && (
						<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]'>
							{cartNo}
						</span>
					)}
				</div>
			</div>
	</nav>
	
</>
)
}

export default Nav
