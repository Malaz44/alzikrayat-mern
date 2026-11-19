import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../AuthContext.jsx';

export default function Photos() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const loadPhotos = async () => {
    try {
      setPhotos(await api.getPhotos());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    if (!file) return setError('Please choose a photo');

    // the photo goes as multipart form data
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('photo', file);

    const form = e.target;
    try {
      await api.uploadPhoto(formData);
      setTitle('');
      setDescription('');
      setFile(null);
      form.reset();
      loadPhotos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* only logged-in users can upload */}
      {user ? (
        <form className="card form" onSubmit={handleUpload}>
          <h2>Upload a photo</h2>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Upload</button>
        </form>
      ) : (
        <p>
          <Link to="/login">Login</Link> to upload photos and comment.
        </p>
      )}

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {photos.map((photo) => (
          <Link to={`/photos/${photo._id}`} key={photo._id} className="card">
            <img src={`/uploads/${photo.fileName}`} alt={photo.title} />
            <h3>{photo.title}</h3>
            <p className="muted">
              by {photo.userId ? `${photo.userId.firstName} ${photo.userId.lastName}` : 'Unknown'}
            </p>
          </Link>
        ))}
      </div>

      {photos.length === 0 && <p>No photos yet.</p>}
    </div>
  );
}