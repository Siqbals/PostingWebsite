import React from 'react';
import backgroundimg from './loginbg.jpg';
import { Link, Navigate, Router, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./stylesheet.css";
import axios from 'axios';
import upvote from "./upvotebtn.png";

function Homepage() {

    const nav = useNavigate();


    const location = useLocation();
    const username = location.state;
    const usernamedecode = location.state.username;
    console.log('username passed into homepage is:', username)

    const [posts, setPosts] = useState([]);
    const [replies, setreplies] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get_posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/get_replies');
                setreplies(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
    
        fetchData();
    }, []);
    
    
    const [replyStates, setReplyStates] = useState({});
    const [replycontent, setreplycontent] = useState('');

    function handlreplycontent(event) {
        setreplycontent(event.target.value);
        console.log('reply content changed');
    }

    function handleReplyButtonClick(postId) {
        setReplyStates(prevStates => ({
            ...prevStates,
            [postId]: !prevStates[postId],
        }));
    }

    function submitreply(channel, userreplyingto, postid) {
        axios.post('http://localhost:8080/submit_reply', {
            channelname: channel,
            replyingto: userreplyingto,
            author: usernamedecode,
            content: replycontent,
            replytopostid: postid,
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error submitting reply:', error);
        }); 
    }
    

    function handlelikechange(post_id) {
        axios.post('http://localhost:8080/add_like', {
            postid: post_id 
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error adding like:', error);
        });
    }

    function handledislikechange(post_id) {
        axios.post('http://localhost:8080/add_dislike', {
            postid: post_id 
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error adding dislike:', error);
        });
    }

    function handlelikechangereply(reply_id) {
        axios.post('http://localhost:8080/add_like_reply', {
            replyid: reply_id
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error adding like:', error);
        });
    }

    function handledislikechangereply(reply_id) {
        axios.post('http://localhost:8080/add_dislike_reply', {
            replyid: reply_id
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error adding dislike:', error);
        });
    }

    const [searchbar, setsearchbar] = useState('');

    function handlesearch(event) {
        setsearchbar(event.target.value);
    }

    function getsearchresults() {
        nav('/searchresults', {state: { searchbar, usernamedecode } })
    }




    var postbox = {
        width: '700px',
        height: '300px',
        backgroundColor: 'white',
        marginTop: '15px',
        left: '2%',
        position: 'relative',
        borderRadius: '20px',
    }

    var replybox = {
        width: '700px',
        height: '300px',
        backgroundColor: 'white',
        marginTop: '15px',
        position: 'relative',
        left: `calc(${postbox.left} + 5%)`,
        borderRadius: '20px',
    }

    var submitreplybox = {
        width: '300px',
        height: '140px',
        backgroundColor: 'white',
        position: 'relative',
        left: `calc(${postbox.left} + 100%)`,
        borderRadius: '15px',

    }

    
    var downvotebtn = {
        width: '30px',
        hieght: '10px',
        position: 'relative',
        top: '75px',
        left: '20px',
    }

    var upvotebtn = {
        width: '30px',
        hieght: '10px',
        position: 'relative',
        top: '75px',
        left: '10px',
    }

    var replybutton = {
        position: 'absolute',
        left: '600px',
        top: '260px',
        width: '80px',
        height: '20px',
        backgroundColor: '#00FFFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '12px',
    }




    return (
        <div className='background'>
            <div className='headerrect'>
                <Link to="/home" className='linkstyle'>Home</Link>
                <Link to="/createpost" state={ username } className='linkstyle'>create post</Link>
                <Link to="/createchannel" state={ username } className='linkstyle'>create channel</Link>
                <Link to="/channelboard" state={ username } className='linkstyle'>all channels</Link>
                <Link to="/adminlogin" state={ username } className='linkstyle'>Administrator</Link>

                <input style={{marginLeft: 'auto', width:'300px'}} onChange={handlesearch} placeHolder='Search for a question'></input>
                <button className='button' onClick={getsearchresults}> Search</button>
            </div>

            <div className>
                <div style={{fontSize: '50px', padding: '8px', color: '#429bf5'}}>Recent Posts</div>
                {posts.slice().reverse().map((post) => (
                    <div key={post.id}> 
                        <div style={postbox}>
                            <button style={upvotebtn} onClick={() => handlelikechange(post.id)}>
                                <img src={upvote} alt="Upvote Button" style={{ width: '10px', height: '10px', transform: 'rotate(180deg)' }} />
                            </button>
                            <button style={downvotebtn} onClick={() => handledislikechange(post.id)}>
                                <img src={upvote} alt="Upvote Button" style={{ width: '10px', height: '10px' }} />
                            </button>

                            <div style={{ position: 'absolute', left: '10px' }}>Likes: {post.likes}</div>
                            <div style={{ position: 'absolute', left: '10px', top: '40px' }}>Dislikes: {post.dislikes}</div>
                            <div style={{ fontSize: '20px', position: 'relative', top: '25px', left: '100px' }}>{post.topic}</div>
                            <div style={{ color: '#808080', textAlign: 'right', paddingRight: '25px' }}>From Channel: {post.channelname}</div>
                            <div style={{ color: '#808080', textAlign: 'right', paddingRight: '25px' }}>By: {post.author}</div>
                            <div style={{ color: '#808080', textAlign: 'right', paddingRight: '25px' }}>ID: {post.id}</div>
                            <div style={{ fontSize: '15px', position: 'relative', top: '30px', left: '25px' }}>{post.content}</div>                        
                            <button style={replybutton} onClick={() => handleReplyButtonClick(post.id)}>Reply</button>
                            
                            {replyStates[post.id] && (
                                <div style={submitreplybox}>
                                    <h1 style={{ margin: '10px', fontSize: '12px' }}>Post Reply</h1>
                                    <input style={{ position: 'absolute', left: '10px', width: '275px', height: '60px' }} onChange={handlreplycontent}></input>
                                    <button style={{left: '230px',top: '100px',position: 'absolute'}} onClick={() => submitreply(post.channelname, post.author, post.id)}>submit</button>
                                </div>
                            )}
                        </div>
                        {replies.map((reply) => (
                            reply.postidreply === post.id && (
                                <div key={reply.id} style={replybox}>
                                    <button style={upvotebtn} onClick={() => handlelikechangereply(reply.id)}>
                                        <img src={upvote} alt="Upvote Button" style={{ width: '10px', height: '10px', transform: 'rotate(180deg)' }} />
                                    </button>
                                    <button style={downvotebtn} onClick={() => handledislikechangereply(reply.id)}>
                                        <img src={upvote} alt="Upvote Button" style={{ width: '10px', height: '10px' }} />
                                    </button>
        
                                    <div style={{ position: 'absolute', left: '10px' }}>Likes: {reply.likes}</div>
                                    <div style={{ position: 'absolute', left: '10px', top: '40px' }}>Dislikes: {reply.dislikes}</div>
                                    <div style={{ fontSize: '20px', position: 'relative', top: '25px', left: '100px' }}>replying to: {post.topic}</div>
                                    <div style={{ color: '#808080', textAlign: 'right', paddingRight: '25px' }}>By: {reply.author}</div>
                                    <div style={{ color: '#808080', textAlign: 'right', paddingRight: '25px' }}>ID: {reply.id}</div>
                                    <div style={{ fontSize: '15px', position: 'relative', top: '30px', left: '25px' }}>{reply.content}</div>                        
                                    <button style={replybutton} onClick={() => handleReplyButtonClick(post.id)}>Reply</button>

                                    {replyStates[post.id] && (
                                        <div style={submitreplybox}>
                                            <h1 style={{ margin: '10px', fontSize: '12px' }}>Post Reply</h1>
                                            <input style={{ position: 'absolute', left: '10px', width: '275px', height: '60px' }} onChange={handlreplycontent}></input>
                                            <button style={{left: '230px',top: '100px',position: 'absolute'}} onClick={() => submitreply(post.channelname, post.author, post.id)}>submit</button>
                                        </div>
                                    )}

                                    
                                 
                                </div> 
                            )
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Homepage;