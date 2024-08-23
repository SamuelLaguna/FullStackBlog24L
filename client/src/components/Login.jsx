import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from 'react'
import { checkToken, GetLoggedInUser } from "../Services/DataService";
import {useNavigate} from 'react-router-dom';
import { login } from "../Services/DataService";
const Login = ({onLogin}) => {
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
    const handleSubmit = async (e) => {
        let userData = {
            username: Username,
            password: Password
        }
        console.log(userData);
        onLogin(userData);
       let token = await login(userData);
        console.log(token);
        if(token != null)
        {
          localStorage.setItem("Token",token)
          GetLoggedInUser(Username);
          navigate('/Dashboard');
        }
    }

  return (
    <Container className="">
      <Row>
        <Col className="form-container d-flex justify-content-center">
         
          <Form>
            <p className="text-center">Login</p>
            <Form.Group className="mb-3" controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" onChange={handleUser} />
             
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
            </Form.Group>
            
            <Button variant="primary"  onClick={handleSubmit}>
              Login
            </Button>
            <p className="mt-3">Dont Have a Account?</p>
            <Button variant="primary"  onClick={() => navigate('/CreateAccount')}>
              Create Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
