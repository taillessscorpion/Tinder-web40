import React, { useState, useEffect } from "react";
import "../../../../css/Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const PhotoReveal = props => {
  const [photoSrc, setPhotoSrc] = useState(null)
  useEffect(()=>{
    if(props.photoFile) {
      const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoSrc(reader.result);
        };
        reader.readAsDataURL(props.photoFile);
    }
  }, [props.photoFile])
  return (
    <div className="declare-photo-wrapper">
      <div
        className="declare-photo-reveal"
        style={{ backgroundImage: "url(" + photoSrc + ")" }}
      ></div>
      <div className="declare-photo-remove-wrapper" onClick={props.handler}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  );
};
