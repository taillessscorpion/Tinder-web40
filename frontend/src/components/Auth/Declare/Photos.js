import React, { useState, useContext, useEffect } from "react";
import "../../../css/Auth.css";
import axios from "../../../utils/axios";
import { LoadingIndicator } from "../../shared/LoadingIndicator";
import AuthCtx from "../../../context/auth";
import { SiteTag } from "../../shared/SiteTag";
import { PhotoInput } from "./Photo/PhotoInput";
import { PhotoReveal } from "./Photo/PhotoReveal"

export const Photos = () => {
  const { authUser, setAuthUser } = useContext(AuthCtx);
  const [values, setValues] = useState({
    email: authUser.email,
    photos: authUser.photos,
  }, () => { });
  const [suc, setSuc] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadPhotos, setUploadPhotos] = useState([], () => { });
  const handleInput = (e) => {
    const newUploadPhotos = [...uploadPhotos];
    let filesLength = e.target.files.length
    if (e.target.files.length > 9) {
      setSuc(null)
      setErr("Cannot up load over 9 photos, over files will be lost");
      filesLength = 9;
    } else if (e.target.files.length === 0) {
      console.log("none input")
    } else {
      setSuc("Have been choosing " + e.target.files.length + " photos")
      setErr(null)
    }
    for (let i = 0; i < filesLength; ++i) {
      newUploadPhotos.push(e.target.files[i]);
    }
    setUploadPhotos(newUploadPhotos);
    /// reset form for input being able to get its new files
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.reset()
  };
  const handleRemove = (removeIndex) => {
    setErr(null)
    setSuc("Removed a photo")
    const newUploadPhotos = [...uploadPhotos];
    newUploadPhotos.splice(removeIndex, 1);
    setUploadPhotos(newUploadPhotos);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadPhotos.length) {
      setErr("Choose one photo at least");
      setSuc(null)
      return;
    }
    setErr(null);
    setLoading(true);
    let uploadLength = uploadPhotos.length;
    if (uploadLength > 9) uploadLength = 9
    const formData = new FormData();
    for (let i = 0; i < uploadLength; ++i) {
      formData.append("file", uploadPhotos[i]);
    }
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        }
      });
      const newRes = await axios.post("/auth/declare/photos", {
        email:authUser.email,
        photos: res.data.files,
      });
      const user = newRes.data;
      setAuthUser(user);
    } catch (err) {
      setErr(err.response.data);
    } finally {
      setLoading(false);
      setSuc("Successfully up load photos");
    }

    // if(values.photos) {
    //   setLoading(true)
    //   try{



    //   } catch(err) {
    //     setErr(err.response.data)
    //     setLoading(false)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
  }

  const renderPhotoFrame = () => {
    const photoWrappers = [];
    for (let s = 0; s < 3; ++s) {
      const photoFrames = []
      for (let i = 0; i < 3; ++i) {
        const c = s * 3 + i;
        photoFrames.push(uploadPhotos[c] ? <PhotoReveal key={c} photoFile={uploadPhotos[c]} handler={() => { handleRemove(c) }} /> : <PhotoInput key={c} photoFiles={uploadPhotos} handler={handleInput} />)
      }
      photoWrappers.push(<div className="declare-photos-container">{photoFrames}</div>)
    }
    return photoWrappers;
  }
  return (
    <div>
      <SiteTag text="Upload profile photos" />
      <form className="auth-form" spellCheck="false" onSubmit={handleSubmit}>
        {loading ? (
          <LoadingIndicator text="Logging in" />
        ) : (
            <>
              {err && <div className="error-alert">{err}</div>}
              {suc && <div className="success-alert">{suc}</div>}
              <div>
                {renderPhotoFrame()}
              </div>
              <button type="submit">Next</button>
            </>
          )}
      </form>
    </div>
  );
};
