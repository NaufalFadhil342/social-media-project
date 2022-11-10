import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/navigation/navbar';

const Home = lazy(() => import('./Pages/main/index'));
const Login = lazy(() => import('./Pages/login/index'));
const Post = lazy(() => import('./Pages/post/index'));

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Suspense fallback={<h1 style={{ marginTop: '5rem' }}>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post" element={<Post />} />
            <Route path="*" element={<h1>THERE WAS AN ERROR</h1>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
