import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';


const App=()=> {

  let [progress,setProgress] = useState(0);
  const pageSize = 15;
  const apiKey = process.env.REACT_APP_API_KEY;
  
  const setProg=(progress)=>{
    setProgress(progress)
  }
    return (
      <Router>
      <div>
    <Navbar />
    <LoadingBar
        color='#f11946'
        progress={progress}
      />
    <Routes>
    <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProg}  key="general" pageSize={pageSize} country='in' category='general' />} />
      <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProg}  key="business" pageSize={pageSize} country='in' category='business' />} />
      <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProg}  key="entertaiment" pageSize={pageSize} country='in' category='entertainment' />} />
      <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProg}  key="general" pageSize={pageSize} country='in' category='general' />} />
      <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProg}  key="health" pageSize={pageSize} country='in' category='health' />} />
      <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProg}  key="sports" pageSize={pageSize} country='in' category='sports' />} />
      <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProg}  key="technology" pageSize={pageSize} country='in' category='technology' />} />
      <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProg}  key="science" pageSize={pageSize} country='in' category='science' />} />
    </Routes>
    </div>
</Router>
    )

}
export default App;