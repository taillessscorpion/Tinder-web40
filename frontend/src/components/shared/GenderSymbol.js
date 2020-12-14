import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMars, faVenus} from '@fortawesome/free-solid-svg-icons';
import "../../css/shared.css";

export const GenderSymbol = props => {
    return (
        <div className={props.gender ? "gender-male" : "gender-female"}>
        {props.gender ? <FontAwesomeIcon icon={faMars}/> : <FontAwesomeIcon icon={faVenus}/>}
        </div>
    )
}