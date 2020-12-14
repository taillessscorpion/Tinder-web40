import React from "react";
import "../../../../css/Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const PhotoInput = props => {
  return (
    <div className="declare-photo-wrapper">
      <div className="declare-photo-reveal"></div>
      <div className="declare-photo-input-wrapper" onInput={props.handler}>
        <FontAwesomeIcon icon={faPlus} />
        <input
          className="declare-photo-input"
          type="file"
          multiple
          accept="image/*"
        />
      </div>
    </div>
  );
};
