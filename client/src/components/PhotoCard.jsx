import { Link } from 'react-router-dom';

// one photo in the gallery, layout is "grid" or "list"
export default function PhotoCard({ photo, layout }) {
  const owner = photo.userId ? `${photo.userId.firstName} ${photo.userId.lastName}` : 'Unknown';

  return (
    <Link to={`/photos/${photo._id}`} className={`card photo-card ${layout}`}>
      <img src={`/uploads/${photo.fileName}`} alt={photo.title} />
      <div>
        <h3>{photo.title}</h3>
        <p className="muted">by {owner}</p>
      </div>
    </Link>
  );
}