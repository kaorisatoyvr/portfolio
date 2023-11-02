import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';

function Header() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
        
        <header id="masthead" >
            {isDesktop ? (
                    
                    <div className="site-header h-[70px] fixed top-0 right-0 left-0 bottom-0 flex justify-between items-center bg-white z-9999">
                        <div className="site-branding">
                            <a href="/">
                            <p className="site-title font-brightwall text-brown">Kaori Sato</p>
                            </a>
                        </div>
                        <div>
                            <nav className="site-navigation text-brown">
                            <ul>
                                <li><NavLink to='/' end>Home</NavLink></li>
                                <li><NavLink to='/about'>About</NavLink></li>
                                <li><NavLink to='/works'>Works</NavLink></li>
                                <li><a href='#contacts'>Contacts</a></li>
                            </ul>
                            </nav>
                        </div>
                    </div>

                ) : ( 
                    
                     <div className="site-header flex justify-between w-full z-9999">
                        <div className="site-branding">
                            <a href="/">
                            <p className="site-title font-brightwall text-brown">Kaori Sato</p>
                            </a>
                        </div>
                        <div className="mobile-header">
                            <p>add hamburger menu later</p>
                         </div>
                    </div>
                    
                )}
         </header>
    );
}
export default Header