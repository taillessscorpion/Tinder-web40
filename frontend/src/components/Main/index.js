import React from "react";
import { Route } from "react-router-dom";
import "../../css/Main/index.css";
import { Col, Container, Row } from "react-bootstrap";
import { Background } from '../shared/Background';
import { LogoBanner } from "../shared/LogoBanner";
import { MatchScreen } from "./Match/index";
import { ChatScreen } from "./Chat/index";
import { FollowScreen } from "./Follow/index";

export const Main = () => {
  return (
    <div className="background-container">
      <Background stage={"match"} />
      <Container fluid>
        <Row xl={3} lg={2} md={2} sm={1} xs={1} className="justify-content-center">
          <Col className={"bg-trans-black body-wrapper"}>
            <div>
              <LogoBanner goHome={true} />
            </div>
            <div>
              <Route exact path="/main/match" component={MatchScreen} />
              <Route exact path="/main/chat" component={ChatScreen} />
              <Route exact path="/main/follow" component={FollowScreen} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
