import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login.js';
import Signup from './signup.js';
import Homepage from './home.js';
import Createpost from './createpost.js';
import Createchannel from './createchannel.js';
import Channelboard from './channelboard.js';
import Channel from './Channel.js';
import Adminlogin from './adminlogin.js';
import Admindashboard from './admindashboard.js';
import Searchresults from './searchresults.js';


function App() {
  return (
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage/>} exact />
        <Route path="/createpost" element={<Createpost/>} exact />
        <Route path="/createchannel" element={<Createchannel/>} exact />
        <Route path="/channelboard" element={<Channelboard />} exact />
        <Route path="/channelboard/:channelName" element={<Channel />} exact />
        <Route path="/adminlogin" element={<Adminlogin />} exact /> 
        <Route path="/admindashboard" element={<Admindashboard />} exact />
        <Route path="/searchresults" element={<Searchresults />} exact />

        
      </Routes>
  );
}

export default App;
