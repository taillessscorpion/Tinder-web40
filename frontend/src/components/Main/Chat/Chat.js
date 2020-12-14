import React, { useState } from 'react';
import {Container,Row} from 'react-bootstrap'
// import "../../css/Feed.css"
export const Chat = () =>{
    const [values, setValues] = useState({text:""})
    const handleChange = (e) =>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    return(
       <Container>
            <Row xl={3} lg={2} md={2} sm={1} className="justify-content-center"> 
                <div className="show">
                <p style={{textAlign: "center"}}>Name</p>
                <div className="conversation"></div>
                <input value={values.text}  type="text" name="text" placeholder="Type a text..." className="input" onChange={handleChange}/>
                </div>   
            </Row>
       </Container>
    )
}