import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import '../../css/Auth.css';
import axios from '../../utils/axios';
import {LoadingIndicator} from '../shared/LoadingIndicator';
import AuthCtx from '../../context/auth';


export const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [err, setErr] = useState(null);
    const [isSucceeded, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useContext(AuthCtx);

    const handleChanges = e => { 
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setErr(null);
        setSuccess(false);
        if(!values.email) {
            setErr("Email cannot be blank");
            return;
        }
        if(!values.password) {
            setErr("Password cannot be blank");
            return;
        }
        setLoading(true);
        try{
            const res = await axios.post('/auth/login', values);
            const {jwt, user} = res.data;
            setAuthUser(user);
            localStorage.setItem("jwt", jwt);
            setSuccess(true);
        } catch(err) {
            setErr(err.message);
        } finally {
            setLoading(false);
        }
    }
    return(
        <div>
            <form className="auth-form" spellCheck="false" onSubmit={handleSubmit}>
                { loading ? <LoadingIndicator text="Logging in"/> : (<>
                    {err && <div className="error-alert">{err}</div>}
                    {isSucceeded && <div className="success-alert">Successfully logged in</div>}
                    <label>
                        Email: 
                        <input type='text' name="email" placeholder="Example@example.com" value={values.email} onChange={handleChanges}></input>
                    </label>
                    <label>
                        Password:
                        <input type='password' name="password" placeholder="Type your password" value={values.password} onChange={handleChanges}></input>
                    </label>
                    <button type='submit'>Log in</button>  
                    <div>
                        Don't have any account?
                        <Link to='/auth/signup'>Sign up</Link> now
                    </div>
                </>)}
            </form>
        </div>
    )
}