// import React, {useContext, useEffect} from 'react';
// import {Container, Row} from 'react-bootstrap';
// import { Route, useHistory } from 'react-router-dom';
// import authCtx from '../../../context/auth';

// export const Declare = () => {
//     const history = useHistory();
//     const {authUser} = useContext(authCtx);
//     useEffect(()=>{
//         if(authUser) {
//             if(authUser.displayName) {
//                 ///// swipingFeed
//                 history.push("/feed ")
//             } else {
//                 history.push("/auth/declare")
//             }
//         }
//     }, [authUser, history])
//     return (
//         <div>
//             <Container fluid="sm">
//                     <Row xl={3} lg={2} md={2} sm={1} className="justify-content-center">
//                         <img className='logo' src="/logoRectangle.png" alt="logo"></img>
//                     </Row>
//                     <Row xl={3} lg={2} md={2} sm={1} xs={1} className="justify-content-center">
//                         <Route exact path="/auth/declare/signup" component={Signup}></Route>
//                         <Route exact path="/auth     /declare/login" component={Login}></Route>
//                     </Row>
//             </Container>
//         </div>
//     )
// }