import React, {useContext, useEffect} from 'react';
import {Container, Row} from 'react-bootstrap';
import { Route, Link, useHistory } from 'react-router-dom';
import {Signup} from './Signup';
import {Login} from './Login';
import '../../css/Auth.css';
import authCtx from '../../context/auth';
import {LogoBanner} from '../shared/LogoBanner';

export const Auth = () => {
    const history = useHistory();
    const {authUser} = useContext(authCtx);
    useEffect(()=>{
        if(authUser) {
            if(authUser.displayName) {
                ///// swipingFeed
                history.push("/feed ")
            } else {
                history.push("/auth/declare")
            }
        }
    }, [authUser, history])
    return (
        <div>
            <Container fluid="sm">
                    <Row xl={3} lg={2} md={2} sm={1} className="justify-content-center">
                        <LogoBanner/>
                    </Row>
                    <Row xl={3} lg={2} md={2} sm={1} xs={1} className="justify-content-center">
                        <Route exact path="/auth/signup" component={Signup}></Route>
                        <Route exact path="/auth/login" component={Login}></Route>
                    </Row>
            </Container>
        </div>
    )
}