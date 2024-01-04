import react from 'react';
import "./stylesheet.css";
import { useState, useEffect} from 'react';
import { Link, Navigate, Router, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Channelboard() {

    const location = useLocation();
    const username = location.state;
    const usernamedecode = location.state.username;
    const nav = useNavigate();

    const [channels, setchannels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get_channels');
                setchannels(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
    
        fetchData();
    }, []);

    const [channelinput, setchannelinput] = useState('');

    function handlechannelinput(event) {
        setchannelinput(event.target.value);
    }

    function gotochannel() {
        if (channelinput.trim() !== '') {
            const channelName = encodeURIComponent(channelinput); // Encode the channel name for URL
            nav(`/channelboard/${channelName}`, { state: { username, channelinput  } });
        }
    }


    var channelheader = {
        fontSize: '75px',
        padding: '8px',
        color: '#42e6f5',
    }

    return (
        <div className='background'>
            <div style={channelheader}>All Channels</div>
            {channels.map((channel) =>
                <div key={channel.id}>
                    <div style={{margin: '20px'}}>{channel.channel_id} - Created By: {channel.author}</div>
                </div>
            )}

            <div>
                <text style={{margin: '20px'}}>Access Channel: </text>
                <input style={{margin: '20px'}} onChange={handlechannelinput}></input>
                <button className='button' onClick={gotochannel}> Submit </button>
            </div>
        </div>

    )
}

export default Channelboard;