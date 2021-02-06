  
import React, { useState  , useContext} from 'react';
import api from '../../Services/api'
import { Container, Button, Form, FormGroup, Input ,Alert } from 'reactstrap';
import "../Login/login.css"
import {UserContext } from '../../userContext' ;
export default function Login({ history }) {
    const [email, setEmail] = useState("")
    const { isLoggedIn, setIsloggedIn } = useContext(UserContext);
    const [password, setPassword] = useState("")
    const [firstName ,setFirstName] = useState("");
    const [lastName ,setlastName] = useState("");
    const [error ,setError] = useState(false);
    const [errorMessage ,setErrorMessage] = useState("");
    const handleSubmit = async evt => {
        evt.preventDefault();
        try{
            if (email !== "" && password !== "" && firstName !== "" && lastName !== "") {
                console.log('result of the Registeration',firstName , lastName,  email, password)
                const response = await api.post('/user/register', {firstName , lastName , email , password})
                const userId = response.data.user_id || false;
                const user = response.data.user || false;
                if (userId && user) {
                    localStorage.setItem('userID', userId);
                    localStorage.setItem('userToken', user);
                    console.log('done');
                    setIsloggedIn(true);
                    history.push('/');
                    
                } else {
                    const { message } = response.data ;
                    console.log(message)
                    setError(true)
                    setErrorMessage(message)
                    setTimeout(() => {
                    setError(false)
                    setErrorMessage("")
                    }, 2000)
    
                }
            }else {
                setError(true)
                setErrorMessage("You need to fill all the Inputs")
                setTimeout(() => {
                    setError(false)
                    setErrorMessage("")
                }, 2000)
    
            }
        }catch(err){

        }
       
        
    }

    return (
        <Container>
            <h1>Sign Up</h1>
            
            <Form onSubmit={handleSubmit}>

                <FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={{marginTop: "10px"}} >
                    <Input type="text" name="firstName" id="firstName" placeholder="Your First Name" onChange={evt => setFirstName(evt.target.value)} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0"style={{marginTop: "10px"}}>
                    <Input type="text" name="lastName" id="lastName" placeholder="Your Last Name" onChange={evt => setlastName(evt.target.value)} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={{marginTop: "10px"}}>
                    <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={{marginTop: "10px"}}>
                    <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
                </FormGroup>
                
                
                </FormGroup>
                <Button className="submit-btn">Register</Button>
                <FormGroup style={{marginTop: "10px"}}>
                    <Button className="secondary-btn" onClick={() => history.push("/login")}>Sign In</Button>
                </FormGroup>
                {errorMessage ? <p  className="alertMessage">{errorMessage}</p> : ""}
            </Form>
        </Container>
    );
}