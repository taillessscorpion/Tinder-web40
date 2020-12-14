import React, { useState, useContext } from 'react';
import "../../../css/Auth.css";
import axios from "../../../utils/axios";
import { LoadingIndicator } from "../../shared/LoadingIndicator";
import AuthCtx from "../../../context/auth";
import {SiteTag} from '../../shared/SiteTag';


export const Gender = () => {
  const {authUser, setAuthUser } = useContext(AuthCtx);
  const [values, setValues] = useState({
    email: authUser.email,
    gender: authUser.gender,
  });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChanges = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    if (!values.gender) {
      setErr("Choose your gender before submit");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/auth/declare/gender", values);
      const user = res.data;
      setAuthUser(user);
    } catch (err) {
      setErr(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
        <SiteTag text="Declare gender"/>
      <form className="auth-form" spellCheck="false" onSubmit={handleSubmit}>
        {loading ? (
          <LoadingIndicator text="Logging in" />
        ) : (
          <>
            {err && <div className="error-alert">{err}</div>}
            <label>
              <div className="d-flex align-items-center">
                <input className="mr-1"
                  type="radio"
                  name="gender"
                  value={true}
                  onChange={handleChanges}
                />
                <div>Male</div>
              </div>
              <div className="d-flex align-items-center">
              <input className="mr-1"
                type="radio"
                name="gender"
                value={false}
                onChange={handleChanges}
              />
              <div>Female</div>
              </div>
            </label>
            <button type="submit">Next</button>
          </>
        )}
      </form>
    </div>
  );
};
