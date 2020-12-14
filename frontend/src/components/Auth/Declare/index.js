import React, {useContext, useEffect} from 'react';
import { Route, useHistory } from 'react-router-dom';
import authCtx from '../../../context/auth';
import {DisplayName} from './DisplayName';
import {Birthday} from './Birthday';
import {Gender} from './Gender';
import {LivesIn} from './LivesIn';
import {Bio} from './Bio';
import {Photos} from './Photos';
import {Location} from './Location';

export const Declare = () => {
    const history = useHistory();
    const {authUser} = useContext(authCtx);
    useEffect(()=>{
        if(authUser) {
            if(authUser.isDeclared) {
                history.push("/main/match")
            } else {
                if(authUser.displayName === "") {
                    history.push("/auth/declare/display-name")
                }
                else if(authUser.birthday === "") {
                    history.push("/auth/declare/birthday")
                }
                else if(authUser.gender === "") {
                    history.push("/auth/declare/gender")
                }
                else if(authUser.livesIn === "") {
                    history.push("/auth/declare/lives-in")
                }
                else if(authUser.bio === "") {
                    history.push("/auth/declare/bio")
                }
                else if(authUser.photos === "") {
                    history.push("/auth/declare/photos")
                }
                else if(authUser.location === "") {
                    history.push("/auth/declare/location")
                }
            }
        }
    }, [authUser])
    return (
        <div>
            <Route exact path="/auth/declare/display-name" component={DisplayName}/>
            <Route exact path="/auth/declare/birthday" component={Birthday}/>
            <Route exact path="/auth/declare/gender" component={Gender}/>
            <Route exact path="/auth/declare/lives-in" component={LivesIn}/>
            <Route exact path="/auth/declare/bio" component={Bio}/>
            <Route exact path="/auth/declare/photos" component={Photos}/>
            <Route exact path="/auth/declare/location" component={Location}/>
        </div>

    )
}