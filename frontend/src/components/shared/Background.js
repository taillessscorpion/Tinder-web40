import React from 'react';
import "../../css/shared.css";

export const Background = props => {
    const {stage} = props;
    const backgroundSrc = {
        auth:    "/background-auth.jpg",
        nonAuth: "/background-non-auth.jpg",
        match: "/background-match.jpg",
        follow: "/background-follow.jpg",
        chat: "/background-chat.jpg",
        chatBox: "/background-chat-box.jpg",
    }
    return (
        <div className="background-wrapper">
            <img className="background" src={backgroundSrc[stage]} alt="TINDER"></img>
        </div>
    )
}