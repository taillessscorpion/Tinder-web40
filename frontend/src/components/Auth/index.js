import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Route, useHistory } from 'react-router-dom';
import { Signup } from './Signup';
import { Login } from './Login';
import { Declare } from './Declare/index'
import '../../css/Auth.css';
import authCtx from '../../context/auth';
import { Background } from '../shared/Background';
import { LogoBanner } from '../shared/LogoBanner';

export const Auth = () => {
    const history = useHistory();
    const [backgroundAuth, setBackgroundAuth] = useState(null);
    const { authUser } = useContext(authCtx);
    useEffect(() => {
        if (authUser) {
            setBackgroundAuth(true);
            if (authUser.isDeclared) {
                history.push("/main/match")
            } else {
                if (authUser.displayName === "") {
                    history.push("/auth/declare/display-name")
                }
                else if (authUser.birthday === "") {
                    history.push("/auth/declare/birthday")
                }
                else if (authUser.gender === "") {
                    history.push("/auth/declare/gender")
                }
                else if (authUser.livesIn === "") {
                    history.push("/auth/declare/lives-in")
                }
                else if (authUser.bio === "") {
                    history.push("/auth/declare/bio")
                }
                else if (authUser.photos === "") {
                    history.push("/auth/declare/photos")
                }
                else if (authUser.location === "") {
                    history.push("/auth/declare/location")
                }
            }
        } else {
            setBackgroundAuth(false)
        }
    }, [authUser])
    return (
        <div className="background-container">
            <Background stage={backgroundAuth ? "auth" : "nonAuth"} />
            <Container fluid>
                <Row xl={3} lg={2} md={2} sm={1} xs={1} className="justify-content-center">
                    <Col className={backgroundAuth ? "bg-trans-black body-wrapper" : "bg-trans-white body-wrapper"}>
                        <div>
                            <LogoBanner goHome={true} />
                        </div>
                        <div>
                            <Route exact path="/auth/signup" component={Signup}></Route>
                            <Route exact path="/auth/login" component={Login}></Route>
                            <Route path="/auth/declare" component={Declare}></Route>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}