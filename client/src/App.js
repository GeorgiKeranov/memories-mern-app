import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  const authenticatedUser = useSelector(state => state.auth.user);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />}/>

          <Route path="/register" element={!authenticatedUser ? <Register /> : <Navigate to="/" />}/>

          <Route path="/login" element={!authenticatedUser ? <Login /> : <Navigate to="/" />}/>

          <Route path="/posts/:id" element={<PostDetails />}/>
          
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
