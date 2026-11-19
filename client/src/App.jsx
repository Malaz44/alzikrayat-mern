import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Photos from './pages/Photos.jsx';
import PhotoDetail from './pages/PhotoDetail.jsx';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="brand">Alzikrayat</Link>
        <div>
          {user ? (
            <>
              <span>Hi, {user.firstName}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Photos />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}