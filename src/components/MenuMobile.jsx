import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { Squash as Hamburger } from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";

function MenuMobile() {
    const [isOpen, setOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const closeMobileMenu = () => {
        setOpen(false);
    }

    return (
        <>
            {isDesktop ? (
            ""
            ) : ( 
            <div className="">
                
                {isOpen &&
                    <div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                    <nav>
                    <ul className="mobile-nav gap-1 sm:gap-3">
                        <div className="circle flex flex-col">
                            <li><NavLink to='/' onClick={closeMobileMenu} end>
                            <FontAwesomeIcon icon={faHouse} size="xl" />
                            <p className="text-xs text-center uppercase m-0">Home</p>
                            </NavLink></li>
                        </div>
                        <div className="circle flex flex-col">
                            <li><NavLink to='/about' onClick={closeMobileMenu}>
                            <FontAwesomeIcon icon={faUser} size="xl" />
                            <p className="text-xs text-center uppercase m-0">About</p>
                            </NavLink></li>
                        </div>
                        <div className="circle flex flex-col">
                        <li><NavLink to='/works' onClick={closeMobileMenu}>
                             <FontAwesomeIcon icon={faLaptopCode} size="xl" />
                            <p className="text-xs text-center uppercase m-0">Works</p>
                            </NavLink></li>
                        </div>
                        <div className="circle flex flex-col">
                            <li><a href='#contacts' onClick={closeMobileMenu}>
                            <FontAwesomeIcon icon={faEnvelope} size="xl" />
                            <p className="text-[10px] text-center uppercase m-0">Contacts</p>
                            </a></li>
                        </div>
                    </ul>
                    </nav>
                    </motion.div>
                </div>
                }   
                <div className="fixed bottom-0 left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#94B98E] w-18 h-18 rounded-full border black">
                <Hamburger 
                    toggled={isOpen} 
                    toggle={setOpen}
                    color="#492C0E"
                    label="Show menu"
                    easing="ease-in"
                />   
                </div>            
            </div>
            )}
        </>
    )
}
export default MenuMobile;
