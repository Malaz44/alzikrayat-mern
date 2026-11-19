import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="banner">
      <h1>Welcome to Alzikrayat</h1>
      <p>
        Share your memories as photos, explore what others have shared,
        and join the conversation with comments.
      </p>
      <Link to="/gallery" className="btn">Browse the gallery</Link>
      {!user && <Link to="/login" className="btn light">Login / Register</Link>}
    </section>
  );
}