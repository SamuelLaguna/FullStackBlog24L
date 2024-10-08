import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from 'react'
import {createAccount} from '../Services/DataService'
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  let navigate = useNavigate();
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');


    //Function to handle our User
    const handleUser = (e) => {
        setUsername(e.target.value)
        
    }

    //Function to handle our Password
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    //Function to handle our Submit
    const handleSubmit = (e) => {
        let userData = {
            username: Username,
            password: Password
        }
        createAccount(userData);
        navigate('/Login');
        console.log(userData);
        
    }

  return (
    <Container className="">
      <Row>
        <Col className="form-container d-flex justify-content-center">
         
          <Form>
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={handleUser} />
             
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
            </Form.Group>
            
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAccount;
