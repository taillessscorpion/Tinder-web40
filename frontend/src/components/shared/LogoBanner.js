import React from 'react';
import {Link} from 'react-router-dom';

export const LogoBanner = () => {
    return (
        <div>
            <Link to='/home'>
                <img className='logo' src="/logoRectangle.png" alt="logo"></img>
            </Link>
        </div>
    )
}