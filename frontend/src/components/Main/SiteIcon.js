import React from "react";
import "../../css/Main/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Notification } from "./Notification";

export const SiteIcon = (props) => {
  return (
      <div className="site-icon-wrapper" onClick={props.handler}>
        <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
        <Notification text={props.notify}></Notification>
      </div>
  );
};
