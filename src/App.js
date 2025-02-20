import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PostShow from './pages/PostShow';

function App() {
  return (
    <Router>
      <div id="root">
        <Header />
        <main>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/contact" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/chi-tiet-tin-tuc/:slug" element={<PostShow />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;