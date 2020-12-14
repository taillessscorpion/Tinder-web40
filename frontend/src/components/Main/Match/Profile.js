import React from "react";
import "../../../css/Main/Swiping.css";
import { ProfilePhoto } from '../../shared/ProfilePhoto';
import {InfoShort} from './InfoShort';


export const Profile = props => {
  return (
    <div>
      <ProfilePhoto />
      <InfoShort />
    </div>
  );
};
