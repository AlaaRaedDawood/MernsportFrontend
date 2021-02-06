  
import React, { useState , useContext } from 'react';
import api from '../../Services/api'
import { Container, Button, Form, FormGroup, Input , Alert } from 'reactstrap';
import {UserContext}  from '../../userContext'
import "./login.css"
export default function Login({ history }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)
    const { isLoggedIn, setIsloggedIn } = useContext(UserContext);
        
        const handleSubmit = async evt => {

            evt.preventDefault();
            console.log('result of the submit', email, password)
            if(email === "" || password === ""){
                setErrorMessage(true);
                setTimeout(() => { setErrorMessage(false); }, 3000);
            }else{
                const response = await api.post('/login', { email, password })
                const userId = response.data.user_id || false;
                const user = response.data.user || false
                
                if (user && userId) {
                    localStorage.setItem('userID', userId)
                    localStorage.setItem('userToken', user)
                    setIsloggedIn(true);
                    history.push('/')
                } else {
                    const { message } = response.data
                    console.log(message)
                }
            }
            }
            
    

    return (
       
        <Container>
            
            <h1>LOGIN</h1>
            
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={{marginTop: "10px"}}>
                    <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={{marginTop: "10px"}}>
                    <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
                </FormGroup>
               </FormGroup>
                <Button className="submit-btn">Submit</Button>
                <FormGroup style={{marginTop: "10px"}}>
                    <Button className="secondary-btn" onClick={() => history.push("/register")}>Sign Up</Button>
                </FormGroup>
                {errorMessage ? <p  className="alertMessage">Missing Information</p> : ""}
            </Form>
            
           
               
            
        </Container>
    );
}