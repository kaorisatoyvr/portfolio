import React from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import Menu from './Menu';
import MenuMobile from './MenuMobile';

function Header() {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (     
        <header id="masthead" >
            {isDesktop ? (
                    
                    <div className="site-header h-[70px] fixed top-0 right-0 left-0 bottom-0 flex justify-between items-center bg-[#f6f4f7ea] z-50">
                        <div className="site-branding">
                            <a href="/">
                                <p 
                                    className="site-title font-brightwall text-brown">
                                    Kaori Sato
                                </p>
                            </a>
                        </div>
                        <Menu />
                    </div>

                ) : ( 
                    
                     <div className="site-header h-[70px] fixed top-0 right-0 left-0 bottom-0 flex justify-between items-center bg-[#f6f4f7c0] z-50">
                        <div className="site-branding">
                            <a href="/">
                                <p 
                                    className="site-title font-brightwall text-brown">
                                    Kaori Sato
                                </p>
                            </a>
                        </div>
                        <div className="mobile-header fixed bottom-0 w-full my-0 mx-auto">
                            <MenuMobile />
                         </div>
                    </div>
                    
                )}
         </header>
    );
}
export default Header