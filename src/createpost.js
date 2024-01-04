import react from 'react';
import "./stylesheet.css";
import { useState} from 'react';
import { Link, Navigate, Router, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function Createpost() {
    const location = useLocation();
    const userpass = location.state;



    const [channel,setchannel] = useState('');
    const [question, setquestion] = useState('');
    const [details, setdetails] = useState('');
    const [toggleSuccess, settoggle] = useState('');
    const [toggleerr, settoggleerr] = useState('');
    const username = location.state.username;
    console.log('username in the create post page is:',username);
    console.log('location state:', location.state);


    function handlechannel(event) {
        setchannel(event.target.value);
    }

    function handlequestion(event) {
        setquestion(event.target.value);
    }

    function handledetails(event) {
        setdetails(event.target.value);
    }

    function submitpost() {
        axios.post('http://localhost:8080/submit_post', {
            channelname: channel,
            question: question,
            details: details,
            author: username
        })
        .then(response => {
            console.log(response.data);
            settoggle('Post Successfully Submitted!');
        })
        .catch(error => {
            console.error('Error submitting post:', error);
            settoggleerr('Error in creating post, maybe the channel does not exist?')
        });
    }


    return (
    <div className='background'>
        <div className='header'>
            <h1>Create Post</h1>
            <input style={{border: '1px solid black',borderRadius: '4px', width: '400px'}}placeholder="Channel" onChange={handlechannel}></input>
            <input style={{margin: '8px', border: '1px solid black',borderRadius: '4px', width: '400px'}}placeholder="Question" onChange={handlequestion}></input>
            <input style={{border: '1px solid black',borderRadius: '4px', width: '400px', height: '100px'}}placeholder="Details" onChange={handledetails}></input>
            <text>{toggleerr}</text>
            <text>{toggleSuccess}</text>
            <button className='button' onClick={submitpost}>Submit Post</button>
            <Link to="/home" state={userpass} style={{margin: '8px' , fontSize: '16px' , textDecoration: 'underline', color: '#327fa8'}}>
                Back to Main
            </Link>

        </div>a
    </div>
    )
}

export default Createpost;
