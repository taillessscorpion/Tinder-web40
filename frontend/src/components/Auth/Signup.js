import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../../css/Auth.css";
import axios from "../../utils/axios";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import AuthCtx from '../../context/auth';
import {SiteTag} from '../shared/SiteTag';


export const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useContext(AuthCtx);
  const handleChanges = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!values.email) {
      setErr("Email cannot be blank");
      return;
    }
    if (!values.password) {
      setErr("Password cannot be blank");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setErr("Confirm password is not matched");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/auth/signup", values);
      const {jwt, user} = res.data;
      setAuthUser(user);
      localStorage.setItem("jwt", jwt);
    } catch (err) {
      setErr(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <SiteTag text="Sign up" />
      <form className="auth-form" spellCheck="false" onSubmit={handleSubmit}>
        {loading ? (
          <LoadingIndicator text="Signing up..." />
        ) : (
          <>
            {err && <div className="error-alert">{err}</div>}
            <label>
              Email:
              <input
                type="text"
                name="email"
                placeholder="Example@example.com"
                value={values.email}
                onChange={handleChanges}
              ></input>
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                placeholder="Type your password"
                value={values.password}
                onChange={handleChanges}
              ></input>
            </label>
            <label>
              Confirm password:
              <input
                type="password"
                name="confirmPassword"
                placeholder="Retype your password"
                value={values.confirmPassword}
                onChange={handleChanges}
              ></input>
              <div className="error"></div>
            </label>
            <button type="submit">Sign up</button>
            <div>
              Have an account already?
              <Link to="/auth/login">Log in</Link> now
            </div>
          </>
        )}
      </form>
    </div>
  );
};
