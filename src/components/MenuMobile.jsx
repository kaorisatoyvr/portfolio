import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { Squash as Hamburger } from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


function MenuMobile() {
    const [isOpen, setOpen] = useState(false)
    const isDesktop = useMediaQuery('(min-width: 1024px)');
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
                    <nav className="site-navigation text-brown fixed bottom-[20px] left-[25%]">
                    <ul>
                        <div className="flex flex-col">
                            <li className="circle"><NavLink to='/' onClick={closeMobileMenu} end>
                            <FontAwesomeIcon icon={faHouse} />
                            Home</NavLink></li>
                            </div>
                        <li className="circle"><NavLink to='/about' onClick={closeMobileMenu}>About</NavLink></li>
                        <li className="circle"><NavLink to='/works' onClick={closeMobileMenu}>Works</NavLink></li>
                        <li className="circle"><a href='#contacts' onClick={closeMobileMenu}>Contacts</a></li>
                    </ul>
                    </nav>
                </div>
                }   
                <div className="fixed bottom-0 left-[47.5%] bg-[#ede795d8] w-18 h-18 rounded-full border black">
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
