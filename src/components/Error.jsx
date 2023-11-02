import React from 'react';
import error from '../assets/images/404.svg';
import { NavLink } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';



function Error() {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    return (
        <div class="error__container">
            <NavLink className="err_link" to="/">
            <img className={isDesktop ? "error__img-desktop error" : "error__img-mobile error"} src={error} alt="error" />
            
                {isDesktop ? (
                    <button className='error__btn-desktop'> Go back </button>
                ) : (
                    <button className='error__btn-mobile'> Go back </button>
                )
                }
            </NavLink>


        </div>
    )

}
export default Error;