import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import RedirectUser from './pages/Redirect/RedirectUser';
import UserFeed from './pages/UserFeed/UserFeed';
import NotFound from './pages/NotFound/NotFound';
import Post from './pages/Post/Post';

import Private from './Components/PrivateRoute/PrivateRoute';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Favorites from './pages/Favorites/Favorites';


function App() {
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<RedirectUser />}/>
        <Route path="/user" element={<UserFeed />}/>
        <Route path="/admin"  element={<Private role="admin"><Admin /></Private>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post" element={<Post />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;