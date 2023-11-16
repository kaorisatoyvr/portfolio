import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { Fade as Hamburger } from 'hamburger-react'
import { motion } from "framer-motion";


function Menu() {
    const [isOpen, setOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const closeMobileMenu = () => {
        setOpen(false);
    }

    return (
        <>
            {isDesktop ? (
            <div className={`flex justify-start flex-row-reverse ${isOpen ? 'bg-none' : 'bg-[#94b98ec2]'} w-18 h-18 rounded-full`}>
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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                <nav className="site-navigation text-brown uppercase text-lg">
                <ul>
                    <li><NavLink to='/' onClick={closeMobileMenu} end>Home</NavLink></li>
                    <li><NavLink to='/about' onClick={closeMobileMenu}>About</NavLink></li>
                    <li><NavLink to='/works' onClick={closeMobileMenu}>Works</NavLink></li>
                    <li><a href='#contacts' onClick={closeMobileMenu}>Contacts</a></li>
                </ul>
                </nav>
                </motion.div>
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
