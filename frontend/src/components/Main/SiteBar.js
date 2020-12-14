import React from "react";
import {useHistory} from 'react-router-dom';
import "../../css/Main/index.css";
import {
  faComments,
  faFire,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import {SiteIcon} from './SiteIcon';

export const SiteBar = () => {
  const history = useHistory();
  const gotoChat = () => {
    history.push("/main/chat");
  }
  const gotoMatch = () => {
    history.push("/main/match");
  }
  const gotoFollow = () => {
    history.push("/main/follow");
  }
  return (
    <div className="site-bar">
        <SiteIcon icon={faComments} notify={0} handler={gotoChat}/>
        <SiteIcon icon={faFire} notify={0} handler={gotoMatch}/>
        <SiteIcon icon={faCertificate} notify={0} handler={gotoFollow}/>
    </div>
  );
};
