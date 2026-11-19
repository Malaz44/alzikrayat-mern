import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../AuthContext.jsx';
import PhotoCard from '../components/PhotoCard.jsx';

export default function Gallery() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [layout, setLayout] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const loadPhotos = async () => {
    try {
      setPhotos(await api.getPhotos());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

      {/* switch between grid and list display */}
      <div className="toolbar">
        <h2>Gallery</h2>
        <div>
          <button className={layout === 'grid' ? '' : 'secondary'} onClick={() => setLayout('grid')}>Grid</button>
          <button className={layout === 'list' ? '' : 'secondary'} onClick={() => setLayout('list')}>List</button>
        </div>
      </div>

      {loading && <p>Loading photos...</p>}

      <div className={layout === 'grid' ? 'grid' : 'list'}>
        {photos.map((photo) => (
          <PhotoCard key={photo._id} photo={photo} layout={layout} />
        ))}
      </div>

      {!loading && photos.length === 0 && <p>No photos yet.</p>}
    </div>
  );
}