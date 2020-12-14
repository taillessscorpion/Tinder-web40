import React from "react";
import "../../../css/Main/Swiping.css";
import { GenderSymbol } from '../../shared/GenderSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

export const InfoShort = props => {
    return (
        <div className="info-short" onClick={props.handler}>
            <div className="info-short-first-line">
                <GenderSymbol gender={props.profileGender} />
                <div className="">{props.profileDisplayName}</div>
            </div>
            <div className="info-short-second-line">
                <div>{props.profileAge}</div>
                <FontAwesomeIcon icon={faDotCircle} />
                <div>{props.profileLivesIn}</div>
            </div>
        </div>
    )
}