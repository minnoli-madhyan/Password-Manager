import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const navigate = useNavigate();
     const { token, setToken } = useContext(AppContext);

    // const [token, setToken] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        localStorage.removeItem('token')
        setToken(false)
        navigate('/ ')
    }

  return (
    <header className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
        <img src={assets.PassMan} className="w-40 cursor-pointer" onClick={()=>navigate('/')}/>
        <ul className="md:flex items-start gap-5 font-medium hidden">
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-[#273f4f] w-3/5 m-auto hidden' />
            </NavLink>
            {token &&
                <NavLink to='/Vault'>
                    <li className='py-1'>MY VAULT</li>
                    <hr className='border-none outline-none h-0.5 bg-[#273f4f] w-3/5 m-auto hidden' />
                </NavLink>
            }
            <NavLink to='/about'>
                <li className='py-1'>ABOUT US</li>
                <hr className='border-none outline-none h-0.5 bg-[#273f4f] w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-[#273f4f] w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token
                ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img src={assets.profile_pic} className='w-12 rounded-full pr-[7px]' />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                            <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My profile</p>
                            <p onClick={()=>{logout()}} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                 </div> //video:49mins
                :<button onClick={()=>navigate('/login')} className='bg-[#273f4f] text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
            }

            {/* Menu Toggle Icon */}
            <img onClick={()=>setShowMenu(!showMenu)} className='w-6 md:hidden ' src={assets.menu_icon} />

            {/* Overlay - Always Rendered */}
            <div
                className={`fixed inset-0 z-10 bg-black bg-opacity-40 md:hidden transition-opacity duration-300 ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setShowMenu(false)}
            > </div>
            {/* Mobile Menu - Always Rendered */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-[60%] bg-white z-20 transform transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}
                // onClick={(e) => e.stopPropagation()}
            >
                <div className='flex items-center justify-between px-5 py-6'>
                <img
                    onClick={() => setShowMenu(!showMenu)}
                    className='w-6 md:hidden'
                    src={assets.menu_icon}
                    alt=""
                />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                    {token && (
                        <NavLink onClick={() => setShowMenu(false)} to='/Vault'>
                        <p className='px-4 py-2 rounded inline-block'>MY VAULT</p>
                        </NavLink>
                    )}
                    <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT US</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                </ul>
            </div>
        </div>
    </header>
  )
}

export default Navbar