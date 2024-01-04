import react from 'react';
import "./stylesheet.css";
import { useState} from 'react';
import { Link, Navigate, Router, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function Createchannel() {
    const location = useLocation();
    const userpass = location.state || '';
    const username = location.state ? location.state.username || '' : '';
    
    
    console.log('userpass var is: ', userpass);
    console.log('username var is: ', username);



    const [channel,setchannel] = useState('');
    const [toggleSuccess, settoggle] = useState('');


    function handlechannel(event) {
        setchannel(event.target.value);
    }

    function submitchannel() {
        axios.post('http://localhost:8080/submit_channel', {
            channelname: channel,
            author: username
        })
        .then(response => {
            console.log(response.data);
            settoggle('channel Successfully Submitted!');
        })
        .catch(error => {
            console.error('Error submitting channel:', error);
        });
    }


    return (
    <div className='background'>
        <div className='header'>
            <h1>Create New Channel</h1>
            <input style={{border: '1px solid black',borderRadius: '4px', width: '400px'}}placeholder="Channel" onChange={handlechannel}></input>
            <text>{toggleSuccess}</text>
            <button className='button' onClick={submitchannel}>Submit Channel</button>
            <Link to="/home" state={userpass} style={{margin: '8px' , fontSize: '16px' , textDecoration: 'underline', color: '#327fa8'}}>
                Back to Main
            </Link>

        </div>a
    </div>
    )
}

export default Createchannel;
