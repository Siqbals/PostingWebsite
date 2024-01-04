import React from 'react';
import backgroundimg from './loginbg.jpg';
import { Link, Navigate, Router, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './stylesheet.css';
import { useLocation } from 'react-router-dom';



function Adminlogin() {

    const location = useLocation();
    const usernamer = location.state;
    const usernamedecode = location.state.username;

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

    function checkAdmin() {
        if (username === 'admin' && password === 'adminpower') {
            // If credentials are correct, set adminkey to true and navigate to a new page
            nav('/admindashboard', { state: { usernamer } }); // Change '/admin-dashboard' to the desired URL for the admin dashboard
        } else {
            // If credentials are incorrect, display an error message
            seterrorlogin('Incorrect username or password');
        }
    }



    return (
        <div className="background">
            <div className="header">
                <h1> Administrator Login</h1>
                <input style={{margin: '8px', border: '1px solid black',borderRadius: '4px'}}placeholder="username" onChange={handleUsername}></input> 
                <input style={{border: '1px solid black',borderRadius: '4px'}}placeholder="password" onChange={handlePassword}></input>
                <text style={{fontSize:'13px', color: '#327da8'}}>{errorlogin}</text> 
                <button className="button" onClick={checkAdmin}>Submit</button>  
            </div>
        </div>

    );
}

export default Adminlogin;