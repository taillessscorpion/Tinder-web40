import React from "react";
import { Link } from "react-router-dom";
// import "../../css/Feed.css";
import { Container, Row } from "react-bootstrap";
import { Avatar } from "./Avatar";

export const ListMess = (props) => {
  return (
    <Container>
      <Row xl={3} lg={2} md={2} sm={1} className="justify-content-center">
        <div>
            <div style={{textAlign: "center"}}>Tin nhan</div>
          <div className="listMess" style={{marginTop: "10px"}}>
            <ul>
              <li>
                <Link to="/feed/chat">
                    <div style={{display: "flex"}}>
                    <Avatar src=""/>
                  <div style={{marginLeft: "10px"}}>
                      <p>Name</p>
                      <p>New Message</p>
                  </div>
                    </div>
                </Link>
              </li>
              <li>
              <Link to="/feed/chat">
                    <div style={{display: "flex"}}>
                    <Avatar src=""/>
                  <div style={{marginLeft: "10px"}}>
                      <p>Name</p>
                      <p>New Message</p>
                  </div>
                    </div>
                </Link>
              </li>
              <li>
              <Link to="/feed/chat">
                    <div style={{display: "flex"}}>
                    <Avatar src=""/>
                  <div style={{marginLeft: "10px"}}>
                      <p>Name</p>
                      <p>New Message</p>
                  </div>
                    </div>
                </Link>
              </li>
              <li>
              <Link to="/feed/chat">
                    <div style={{display: "flex"}}>
                    <Avatar src=""/>
                  <div style={{marginLeft: "10px"}}>
                      <p>Name</p>
                      <p>New Message</p>
                  </div>
                    </div>
                </Link>
              </li>
              <li>
              <Link to="/feed/chat">
                    <div style={{display: "flex"}}>
                    <Avatar src=""/>
                  <div style={{marginLeft: "10px"}}>
                      <p>Name</p>
                      <p>New Message</p>
                  </div>
                    </div>
                </Link>
              </li>
              <li>
              <Link to="/feed/chat">
                    <div style={{display: "flex"}}>
                    <Avatar src=""/>
                  <div style={{marginLeft: "10px"}}>
                      <p>Name</p>
                      <p>New Message</p>
                  </div>
                    </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Row>
    </Container>
  );
};
