import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { Fade as Hamburger } from 'hamburger-react'


function Menu() {
    const [isOpen, setOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const closeMobileMenu = () => {
        setOpen(false);
    }

    return (
        <>
            {isDesktop ? (
            <div className="flex justify-start flex-row-reverse">
            <Hamburger 
                toggled={isOpen} 
                toggle={setOpen}
                color="#492C0E"
                label="Show menu"
                easing="ease-in"
                direction="reverse"
            />
            {isOpen &&
                <div>
                <nav className="site-navigation text-brown">
                <ul>
                    <li><NavLink to='/' onClick={closeMobileMenu} end>Home</NavLink></li>
                    <li><NavLink to='/about' onClick={closeMobileMenu}>About</NavLink></li>
                    <li><NavLink to='/works' onClick={closeMobileMenu}>Works</NavLink></li>
                    <li><a href='#contacts' onClick={closeMobileMenu}>Contacts</a></li>
                </ul>
                </nav>
            </div>
            }                  
        </div>
            ) : ( 
            ""
            )}
        </>
    )
}
export default Menu;
