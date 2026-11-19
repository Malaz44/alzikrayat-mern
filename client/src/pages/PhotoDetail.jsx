import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../AuthContext.jsx';
import CommentForm from '../components/CommentForm.jsx';

export default function PhotoDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  // load the photo and its comments
  useEffect(() => {
    const load = async () => {
      try {
        setPhoto(await api.getPhoto(id));
        setComments(await api.getComments(id));
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, [id]);

  // used by CommentForm, returns true when the comment was saved
  const handleAddComment = async (text) => {
    setError('');
    try {
      const newComment = await api.addComment(id, user._id, text);
      setComments([...comments, newComment]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.deleteComment(commentId, user._id);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePhoto = async () => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await api.deletePhoto(id, user._id);
      navigate('/gallery');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error && !photo) return <p className="error">{error}</p>;
  if (!photo) return <p>Loading...</p>;

  // delete button only for the owner
  const isOwner = user && photo.userId?._id === user._id;

  return (
    <div className="card">
      <img className="photo-full" src={`/uploads/${photo.fileName}`} alt={photo.title} />
      <h2>{photo.title}</h2>
      <p className="muted">
        by {photo.userId ? `${photo.userId.firstName} ${photo.userId.lastName}` : 'Unknown'} -{' '}
        {new Date(photo.dateTime).toLocaleString()}
      </p>
      {photo.description && <p>{photo.description}</p>}
      {isOwner && (
        <button className="danger" onClick={handleDeletePhoto}>
          Delete photo
        </button>
      )}

      <h3>Comments ({comments.length})</h3>
      {error && <p className="error">{error}</p>}

      {comments.map((c) => (
        <div className="comment" key={c._id}>
          <div>
            <strong>{c.userId ? `${c.userId.firstName} ${c.userId.lastName}` : 'Unknown'}</strong>
            <p>{c.comment}</p>
            <span className="muted">{new Date(c.dateTime).toLocaleString()}</span>
          </div>
          {/* delete button only for the comment author */}
          {user && c.userId?._id === user._id && (
            <button className="danger" onClick={() => handleDeleteComment(c._id)}>
              Delete
            </button>
          )}
        </div>
      ))}

      {user ? (
        <CommentForm onAdd={handleAddComment} />
      ) : (
        <p className="muted">Login to write a comment.</p>
      )}
    </div>
  );
}