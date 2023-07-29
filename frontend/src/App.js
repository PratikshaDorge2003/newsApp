
import './App.css';
import React from 'react'
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NewChannel from './component/NewChannel';
import LoadingBar from 'react-top-loading-bar';
import Navbar from './component/Navbar1';
import Login from './component/Login';
import Register from './component/Register';
import Profile from './component/Profile';

 const App =()=> {
  const[progress,setProg]=useState(0);
 
 
  
const setProgress=(progress)=>{
    setProg(progress);
}
 
const[displayContent,SetdisplayContent]=useState({
  display:"block"
 })


    
    return (

      <div>
     
        <Router>
           <Navbar displayContent={displayContent} />

           <LoadingBar  
           color='green'
           progress={progress}
            />
                 
          <Routes>
            <Route exact path="/login" element={ <Login SetdisplayContent={SetdisplayContent}/>}/>
            <Route exact path="/" element={ <Register  SetdisplayContent={SetdisplayContent}/>}/>
            <Route exact path="/general" element={<NewChannel NewChannel setProgress={setProgress}   key="General" country="in" category="General" />} />   
            <Route exact path="/business" element={<NewChannel NewChannel setProgress={setProgress}    key="Business"  country="in" category="Business" />} />  
            <Route exact path="/sports" element={<NewChannel NewChannel setProgress={setProgress}    key="Sports"  country="in" category="Sports" />} />
            <Route exact path="/entertainment" element={<NewChannel NewChannel setProgress={setProgress}    key="Entertainment"  country="in" category="Entertainment" />} />
            <Route exact path="/health" element={<NewChannel NewChannel setProgress={setProgress}   key="Health"  country="in" category="Health" />} />
            <Route exact path="/science" element={<NewChannel NewChannel setProgress={setProgress}    key="Science"  country="in" category="Science" />} />
            <Route exact path="/profile" element={<Profile setProgress={setProgress} />} />
          </Routes>
        </Router>
      </div>
    )
  
}
export default App


