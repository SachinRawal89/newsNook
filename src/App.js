import './App.css';
import React, { useEffect } from 'react'
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import Header from './components/Header';


const App = () => {

  let [progress, setProgress] = useState(0);
  
  const setProg = (progress) => {
    setProgress(progress)
  }
  return (
    <Router>
      <div>
        <Header />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProg} key="general" category='general' />} />
          <Route exact path="/business" element={<News setProgress={setProg} key="business" category='business' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProg} key="entertaiment" category='entertainment' />} />
          <Route exact path="/general" element={<News setProgress={setProg} key="general" category='general' />} />
          <Route exact path="/health" element={<News setProgress={setProg} key="health" category='health' />} />
          <Route exact path="/sports" element={<News setProgress={setProg} key="sports" category='sports' />} />
          <Route exact path="/technology" element={<News setProgress={setProg} key="technology" category='technology' />} />
          <Route exact path="/science" element={<News setProgress={setProg} key="science" category='science' />} />
        </Routes>
      </div>
    </Router>
  )

}
export default App;