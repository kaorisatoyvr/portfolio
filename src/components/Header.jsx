import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import Menu from './Menu';
import MenuMobile from './MenuMobile';

function Header() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
        
        <header id="masthead" >
            {isDesktop ? (
                    
                    <div className="site-header h-[70px] fixed top-0 right-0 left-0 bottom-0 flex justify-between items-center bg-[#f6f4f7ea] z-9999">
                        <div className="site-branding">
                            <a href="/">
                            <p className="site-title font-brightwall text-brown">Kaori Sato</p>
                            </a>
                        </div>
                        <Menu />
                        {/* <div>
                            <nav className="site-navigation text-brown">
                            <ul>
                                <li><NavLink to='/' end>Home</NavLink></li>
                                <li><NavLink to='/about'>About</NavLink></li>
                                <li><NavLink to='/works'>Works</NavLink></li>
                                <li><a href='#contacts'>Contacts</a></li>
                            </ul>
                            </nav>
                        </div> */}
                    </div>

                ) : ( 
                    
                     <div className="site-header h-[70px] fixed top-0 right-0 left-0 bottom-0 flex justify-between items-center bg-[#f6f4f7c0] z-9999">
                        <div className="site-branding">
                            <a href="/">
                            <p className="site-title font-brightwall text-brown">Kaori Sato</p>
                            </a>
                        </div>
                        <div className="mobile-header fixed bottom-0 w-full my-0 mx-auto">
                            {/* <p>add hamburger menu later</p> */}
                            <MenuMobile />
                         </div>
                    </div>
                    
                )}
         </header>
    );
}
export default Header