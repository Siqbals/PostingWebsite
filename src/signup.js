import { findByLabelText } from '@testing-library/react';
import React from 'react';
import backgroundimg from './loginbg.jpg';
import { Link, Router } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import "./stylesheet.css";



function Signup() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [errorstate, seterrorstate] = useState('');

    function handleUsername(event) {
        setusername(event.target.value);
        console.log('changed username');
    }

    function handlePassword(event) {
        setpassword(event.target.value);
        console.log('changed username');
    }



    function submit_signup() {
        axios.post('http://localhost:8080/submit_login', {
            username: username,
            password: password,
        })
        .then(response => {
            console.log(response.data);
            seterrorstate('Successfully Made an Account!')
        })
        .catch(error => {
            console.error('Error submitting signup:', error);
        });
    }
    


    var buttonStyle = {
        backgroundColor: '#00FFFF',
        color: 'white',
        padding: '6px 65px', // Adjust padding as needed
        border: 'none',
        borderRadius: '4px', // Adjust border radius as needed
        cursor: 'pointer',
        fontSize: '12px', // Adjust font size as needed
        margin: '8px',
      };

    var background = {
        backgroundImage: `url(${backgroundimg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'     
    }
    var headerstyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh', 
        color: '#42e6f5',
        fontSize: '20px'
    };


    return (
        <div className="background">
            <div className="header">
                <h1> Welcome to The Board</h1>
                <input style={{border: '1px solid black',borderRadius: '4px'}}placeholder="username" onChange={handleUsername}></input> 
                <input style={{margin: '8px', border: '1px solid black',borderRadius: '4px'}}placeholder="password" onChange={handlePassword}></input> 
                <button className="button" onClick={submit_signup}>Sign Up</button>
                <Link to="/" style={{fontSize: '13px' , textDecoration: 'underline'}}>
                    Back to Login
                </Link>
                <text>{errorstate}</text>
            </div>
        </div>

    );
}


export default Signup;