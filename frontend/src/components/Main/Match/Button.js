import React from "react";
import "../../../css/Main/Swiping.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Button = props => {
    return (
        <div
            className={props.custom}
            title={props.title}
            onClick={props.handler}
        >
            <FontAwesomeIcon icon={props.icon}/>
        </div>
    )
}