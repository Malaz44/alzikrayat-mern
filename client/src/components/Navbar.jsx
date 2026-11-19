import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Alzikrayat</Link>
      <div>
        <Link to="/gallery">Gallery</Link>
        {/* greeting when logged in, login link when logged out */}
        {user ? (
          <>
            <span>Hi {user.firstName}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Please Login</Link>
        )}
      </div>
    </nav>
  );
}