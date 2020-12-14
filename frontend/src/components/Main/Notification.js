import React from 'react'
import "../../css/shared.css";
export const Notification = (props) =>{
    return(
        <div>
      <button className="notification">{props.text}</button>
        </div>
    )
}