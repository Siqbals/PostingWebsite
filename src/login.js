import React from 'react';
import backgroundimg from './loginbg.jpg';
import { Link, Navigate, Router, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './stylesheet.css';



function Login() {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorlogin, seterrorlogin] = useState('');
    const nav = useNavigate();

    function handleUsername(event) {
        setUsername(event.target.value);
        console.log('changed username');
    }

    function handlePassword(event) {
        setPassword(event.target.value);
        console.log('changed username');
    }

    function handleLogin() {
        axios.post('http://localhost:8080/login', {
            username: username,
            password: password,
        })
        .then(response => {
            console.log(response.data);
            console.log('username passing through is: ', username);
            nav("/home" , { state: { username } });
        })
        .catch(error => {
            console.error('Error submitting login:', error);
            seterrorlogin('username or password is incorrect');
        });
    }



    return (
        <div className="background">
            <div className="header">
                <h1> Welcome to The Board</h1>
                <input style={{margin: '8px', border: '1px solid black',borderRadius: '4px'}}placeholder="username" onChange={handleUsername}></input> 
                <input style={{border: '1px solid black',borderRadius: '4px'}}placeholder="password" onChange={handlePassword}></input>
                <text style={{fontSize:'13px', color: '#327da8'}}>{errorlogin}</text> 
                <button className="button" onClick={handleLogin}>Login</button>
                <Link to="/Signup" style={{fontSize: '13px' , textDecoration: 'underline'}}>
                    Sign Up
                </Link>

                
            </div>
        </div>

    );
}

export default Login;