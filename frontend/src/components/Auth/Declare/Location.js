import React, { useState, useContext, useEffect } from "react";
import "../../../css/Auth.css";
import axios from "../../../utils/axios";
import { LoadingIndicator } from "../../shared/LoadingIndicator";
import AuthCtx from "../../../context/auth";
import LocationCtx from "../../../context/location";
import { SiteTag } from "../../shared/SiteTag";

export const Location = () => {
  const { authUser, setAuthUser } = useContext(AuthCtx);
  const { locationPermission, setLocationPermission } = useContext(LocationCtx);
  const [values, setValues] = useState({
    email: authUser.email,
    location: authUser.location,
    isDeclared: authUser.isDeclared,
  })
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleGetPrompt = (e) => {
    e.preventDefault();
    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then(result => {
        setLocationPermission(result.state);
        result.onchange = () => {
          setLocationPermission(result.state);
        }
      });
  }
  useEffect(() => {
    console.log(locationPermission)
    const updateLocation = async () => {
      setLoading(true);
      setErr(null);
      const pstObj = {}
      await navigator.geolocation.getCurrentPosition(position => {
        const pst = position.coords;
        pstObj.latitude = pst.latitude;
        pstObj.longitude = pst.longitude;

        console.log(pstObj)
        setValues({
          ...values,
          location: pstObj,
          isDeclared: true
        });
      });
      try {
        const res = await axios.post("/auth/declare/location", values);
        if(res)
        const user = res.data;
        setAuthUser(user);
      } catch (err) {
        setErr(err.response.data);
      } finally {
        setLoading(false);
      }

    }
    const getPrompt = () => {
      navigator.geolocation.getCurrentPosition(updateLocation)
    }
    if (locationPermission === "granted") {
      updateLocation();
    } else if (locationPermission === "prompt") {
      getPrompt();
      setErr("Turn on location to use this website's feature");
    } else if (locationPermission === "denied") {
      setErr("Location is blocked on this site, try to turn on the location");
    }
  }, [locationPermission])


  return (
    <div>
      <SiteTag text="Get location" />
      <form className="auth-form" spellCheck="false">
        {loading ? (
          <LoadingIndicator text="Logging in" />
        ) : (
            <>
              {err && <div className="error-alert">{err}</div>}
              {!locationPermission && <div><button onClick={handleGetPrompt}>Turn on location</button></div>}
            </>
          )}
      </form>
    </div>
  );
};
