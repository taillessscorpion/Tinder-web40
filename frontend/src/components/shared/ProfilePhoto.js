import React from 'react';
import "../../css/shared.css";

export const ProfilePhoto = props =>{
    return(
        <div className={props.custom} style={{backgroundImage: `url(${props.photoSrc})`}}>
        </div>
    )
}