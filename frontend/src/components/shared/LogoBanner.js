import React from 'react';
import { useHistory } from 'react-router-dom';
import "../../css/shared.css";

export const LogoBanner = props => {
    const history = useHistory()
    const handleClick = () => {
        if (props.goHome) {
            history.push("/home");
        } else {
            history.goBack();
        }
    }
    return (
        <div onClick={handleClick}>
            <img className='logo' src="/logoRectangle.png" alt="logo"></img>
        </div>
    )
}