import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import authCtx from '../context/auth';
import { Background } from './shared/Background';
import { LogoBanner } from './shared/LogoBanner'

export const Home = () => {
    const history = useHistory();
    const [backgroundAuth, setBackgroundAuth] = useState(null);
    const { authUser, setAuthUser } = useContext(authCtx);
    const handleGoBack = () => {
        history.goBack();
    }
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setAuthUser(null);
    }
    useEffect(() => {
        if (authUser) {
            setBackgroundAuth(true)
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
                            <LogoBanner goHome={false} />
                        </div>
                        <div>
                            <div>Tinder Dating App</div>
                            <div>It starts here!!</div>
                        </div>
                        {authUser ? (
                            <div>
                                <button onClick={handleGoBack}>Back</button>
                                <button onClick={handleLogout}>Log out</button>
                            </div>
                        ) : (
                                <div className="wrapper">
                                    <div>
                                        Go to dating now.
                                    <Link to='/auth/login'> Log in</Link>
                                    </div>
                                    <div>
                                        Are you new here?
                                    <Link to='/auth/signup'> Sign up</Link>
                                    </div>
                                </div>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}