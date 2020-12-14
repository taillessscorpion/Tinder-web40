import { React, useState } from "react";
import "../../../css/Main/Swiping.css";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { SiteBar } from "../SiteBar";
import { Profile } from './Profile';
import { Info } from "./Info";
import { Result } from "./Result";
import { Button } from "./Button";


export const MatchScreen = () => {
  const [result, setResult] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [nextUser, setNextUser] = useState(0);
  const setNope = () => {
    setResult("nope");
    setTimeout(() => {
      setResult(false);
      setNextUser(nextUser + 1);
    }, 400);
  }
  const setLike = () => {
    setResult("like");
    setTimeout(() => {
      setResult(false);
      setNextUser(nextUser + 1);
    }, 400);
  }
  const getMoreInfo = () => {
    setSeeMore(true);
  }
  const getBackProfile = () => {
    setSeeMore(false);
  }
  return (
    <div>
      <SiteBar />
      <div className="screen-container">
        <div className="screen-body">
          {seeMore ? <Info handler={getBackProfile}/>: <Profile handler={getMoreInfo}/> }
          {result === "like" && <Result custom={"result-like"} text={"LIKE"} />}
          {result === "nope" && <Result custom={"result-nope"} text={"NOPE"} />}
        </div>
        <div className="btn-wrapper">
          <Button custom="btn-nope" title="Nope" icon={faTimes} handler={setNope} />
          <Button custom="btn-like" title="Like" icon={faHeart} handler={setLike} />
        </div>
      </div>
    </div>
  );
};
