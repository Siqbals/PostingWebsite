import React from 'react';
import './stylesheet.css';
import {useState} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function Admindashboard() {

    const location = useLocation();
    const usernamer = location.state;
    const usernamedecode = location.state.usernamer;

    console.log(usernamedecode.username);



    const [deluser, setdeluser] = useState('');
    const [delchannel, setdelchannel] = useState('');
    const [delpost, setdelpost] = useState('');
    const [delreply, setdelreply] = useState('');

    const [selfdeletemsg, toggleselfdeletemsg] = useState('');

    function handleusr(event) {
        setdeluser(event.target.value);
    }

    function handlechannel(event) {
        setdelchannel(event.target.value);
    }

    function handlepost(event) {
        setdelpost(event.target.value);
    }

    function handlereply(event) {
        setdelreply(event.target.value);
    }

    function handleusrdel() {
        if (deluser === usernamedecode.username) {
            toggleselfdeletemsg('Cannot Delete Account that is currently logged on')
        }
        else{
            axios.post('http://localhost:8080/delete_user', {
                username: deluser 
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
        }

    }

    function handlechanneldel() {
        axios.post('http://localhost:8080/delete_channel', {
            channelid: delchannel 
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error deleting channel:', error);
        });
    }

    function handlepostdel() {
        axios.post('http://localhost:8080/delete_post', {
            postid: delpost 
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error deleting channel:', error);
        });
    }

    function handlereplydel() {
        axios.post('http://localhost:8080/delete_reply', {
            replyid: delreply 
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error deleting channel:', error);
        });
    }

    return (
        <div className='background'>
            <div style={{fontSize: '50px', padding: '8px', color: '#429bf5'}}>Admin Controls</div>
            <div>
                <text style={{ position: 'relative',top: '50px',margin: '20px'}}>Delete User: </text>
                <input style={{position: 'relative',top: '50px'}}placeholder='username' onChange={handleusr}></input>
                <button style={{position: 'relative',top: '50px'}}className='button' onClick={handleusrdel}>Submit</button>
                <text>{selfdeletemsg}</text>
                <br></br>
                <text style={{ position: 'relative',top: '50px',margin: '20px'}}>Delete Channel: </text>
                <input style={{position: 'relative',top: '50px'}}placeholder='Channel Name' onChange={handlechannel}></input>
                <button style={{position: 'relative',top: '50px'}}className='button' onClick={handlechanneldel}>Submit</button>
                <br></br>
                <text style={{ position: 'relative',top: '50px',margin: '20px'}}>Delete Post: </text>
                <input style={{position: 'relative',top: '50px'}}placeholder='Posted Question' onChange={handlepost}></input>
                <button style={{position: 'relative',top: '50px'}}className='button' onClick={handlepostdel}>Submit</button>
                <br></br>
                <text style={{ position: 'relative',top: '50px',margin: '20px'}}>Delete Reply: </text>
                <input style={{position: 'relative',top: '50px'}}placeholder='Reply' onChange={handlereply}></input>
                <button style={{position: 'relative',top: '50px'}}className='button'onClick={handlereplydel}>Submit</button>
            </div>
        </div>
    )
}

export default Admindashboard;

