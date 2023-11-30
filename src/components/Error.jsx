import React from 'react';
import errorImg from '../assets/images/404.png';
import { NavLink } from 'react-router-dom';

function Error() {
    
    return (
        <div className="error__container">
            <NavLink className="err_link" to="/">
            <img    className="error__img-desktop error"
                    src={errorImg}
                    alt="error" />
            <button className='error__btn-desktop'> Go back </button>            
            </NavLink>
        </div>
    )
}
export default Error;