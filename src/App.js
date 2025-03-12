import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import PostShow from './pages/PostShow';
import Contact from './pages/Contact';
import Login from './dashboard/Login';
import DashboardLayout from './components/DashboardLayout ';
import Web from './components/Web';
import DanhmucList from './dashboard/danhmuc/DanhmucList';
import DanhmucCreate from './dashboard/danhmuc/DanhmucCreate';
import DanhmucUpdate from './dashboard/danhmuc/DanhmucUpdate';
import Dashboard from './dashboard/Dashboard';
import Tintuc from './dashboard/tintuc/Tintuc';
import CreateTintuc from './dashboard/tintuc/CreateTintuc';
import UpdateTintuc from './dashboard/tintuc/UpdateTintuc';
function App() {
  return (
    <Router>
      <div id="root">
        <main>
          <Routes>
            <Route element={<Web/>}>
              <Route path="/" element={<Home />} />
              <Route path="/post/:slug" element={<Post />} />
              <Route path="/chi-tiet-tin-tuc/:slug" element={<PostShow />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/login" element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard/danhmucs" element={<DanhmucList />} />
              <Route path="/dashboard/danhmucs/create" element={<DanhmucCreate />} />
              <Route path="/dashboard/danhmucs/edit/:id" element={<DanhmucUpdate />} />
              <Route path="/dashboard/tintucs" element={<Tintuc />} />
              <Route path="/dashboard/tintucs/create" element={<CreateTintuc />} />
              <Route path="/dashboard/tintucs/edit/:id" element={<UpdateTintuc />} />
              
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;