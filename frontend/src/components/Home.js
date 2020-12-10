import React, { useContext, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import '../css/Home.css';
import authCtx from '../context/auth';

export const Home = () => {
    const history = useHistory();
    const {authUser} = useContext(authCtx);
    useEffect(()=>{
        if(authUser) {
            //// swipingFeed
            history.push("/Feed")
        }
    }, [authUser, history])
    return (
        <div>
            <Container fluid="sm">
                    <Row xl={3} lg={2} md={2} sm={1} className="justify-content-center">
                        <img className='logo' src="/logoRectangle.png" alt="logo"></img>
                    </Row>
                    <Row xl={3} lg={2} md={2} sm={1} xs={1} className="justify-content-center">
                        <Col>
                            <div>
                                <div>Tinder Dating App</div>
                                <div>Where beautiful love stories begin</div>
                            </div>
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
                        </Col>
                    </Row>

            </Container>
        </div>
    )
}