import React, { useState, useContext } from 'react';
import '../../../css/Auth.css';
import axios from '../../../utils/axios';
import { LoadingIndicator } from '../../shared/LoadingIndicator';
import AuthCtx from '../../../context/auth';
import { SiteTag } from '../../shared/SiteTag';

export const Birthday = () => {
    const { authUser, setAuthUser } = useContext(AuthCtx);
    const thisYear = new Date().getFullYear();
    const [values, setValues] = useState({
        email: authUser.email,
        birthday: authUser.birthday,
    })
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);
    const renderOption = () => {
        const options = []
        if (!values.birthday) {
            setValues({
                ...values,
                birthday: thisYear,
            })
        }
        for (let i = thisYear; i > thisYear - 99; --i) {
            options.push(<option key={i} value={i}>{i}</option>)
        }
        options.push(<option value={thisYear - 100}>Before {thisYear - 100}</option>)
        return options
    }
    const handleChanges = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setErr(null);
        setLoading(true);
        try {
            const res = await axios.post('/auth/declare/birthday', values);
            const user = res.data;
            setAuthUser(user);
        } catch (err) {
            setErr(err.response.data);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <SiteTag text="Declare year of birth" />
            <form className="auth-form" spellCheck="false" onSubmit={handleSubmit}>
                {loading ? <LoadingIndicator text="Logging in" /> : (<>
                    {err && <div className="error-alert">{err}</div>}
                    <label>
                        <select name="birthday" value={values.birthday} onChange={handleChanges}>
                            {renderOption()}
                        </select>
                    </label>
                    <button type='submit'>Next</button>
                </>)}
            </form>
        </div>
    )
}