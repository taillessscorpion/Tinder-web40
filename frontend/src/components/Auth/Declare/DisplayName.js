import React, {useState, useContext} from 'react';
import '../../../css/Auth.css';
import axios from '../../../utils/axios';
import {LoadingIndicator} from '../../shared/LoadingIndicator';
import AuthCtx from '../../../context/auth';
import {SiteTag} from '../../shared/SiteTag';


export const DisplayName = () => {
    const {authUser, setAuthUser} = useContext(AuthCtx);
    const [values, setValues] = useState({
        email: authUser.email,
        displayName: authUser.displayName,
    })
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChanges = e => { 
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setErr(null);
        if(!values.displayName) {
            setErr("Display name cannot be blank");
            return;
        }
        setLoading(true);
        try{
            const res = await axios.post('/auth/declare/display-name', values);
            const user = res.data;
            console.log(user)
            setAuthUser(user);
        } catch(err) {
            setErr(err.response.data);
        } finally {
            setLoading(false);
        }
    }
    return(
        <div>
            <SiteTag text="Declare display name" />
            <form className="auth-form" spellCheck="false" onSubmit={handleSubmit}>
                { loading ? <LoadingIndicator text="Logging in"/> : (<>
                    {err && <div className="error-alert">{err}</div>}
                    <label>
                        <input type='text' name="displayName" placeholder="Type your display name" value={values.displayName} onChange={handleChanges}></input>
                    </label>
                    <button type='submit'>Next</button>
                </>)}
            </form>
        </div>
    );
}