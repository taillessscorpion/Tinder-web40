import React from 'react';
import '../../../css/Main/Swiping.css'

export const Result = props => {
    return (
    <div className={props.custom}>{props.text}</div>
    )
}