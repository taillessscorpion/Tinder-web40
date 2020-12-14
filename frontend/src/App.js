import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Auth } from "./components/Auth/index";
import { Main } from "./components/Main/index";
import AuthCtx from "./context/auth";
import LocationCtx from "./context/location";
import axios from "./utils/axios";
import { LoadingIndicator } from "./components/shared/LoadingIndicator";



const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [signing, setSigning] = useState(true);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setSigning(false);
      return;
    }
    try {
      axios
        .post("/auth/permission", null, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          const newJwt = res.data.jwt;
          localStorage.setItem("jwt", newJwt);
          setAuthUser(res.data.user);
          axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
          setSigning(false);
        });
    } catch (err) {
      setSigning(false);
    }
  }, []);
  return (
    <AuthCtx.Provider value={{ authUser, setAuthUser }}>
      <LocationCtx.Provider value={{ locationPermission, setLocationPermission }}>
        {signing ? (
          <LoadingIndicator text="Loading..." />
        ) : (
            <>
              <Route path="/home" component={Home} />
              <Route path="/auth" component={Auth} />
              <Route path="/main" component={Main} />
            </>
          )}
      </LocationCtx.Provider>
    </AuthCtx.Provider>
  );
};

export default App;
