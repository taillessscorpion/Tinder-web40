import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons';

export const LoadingIndicator = props => {
    return(
        <label className="align-items-center d-flex flex-column my-3">
            <div>{props.text}</div>
            <FontAwesomeIcon spin icon={faCircleNotch}/>
        </label>
    )

}