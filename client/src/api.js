// small helper for calling the Express API
const request = async (url, options = {}) => {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // the server sends either one message or a list of errors
    const message = data.errors ? data.errors.join(', ') : data.message;
    throw new Error(message || 'Something went wrong');
  }
  return data;
};

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const api = {
  register: (data) => request('/api/auth/register', json('POST', data)),
  login: (data) => request('/api/auth/login', json('POST', data)),

  getPhotos: () => request('/api/photos'),
  getPhoto: (id) => request(`/api/photos/${id}`),
  uploadPhoto: (formData) => request('/api/photos', { method: 'POST', body: formData }),
  deletePhoto: (id, userId) => request(`/api/photos/${id}`, json('DELETE', { userId })),

  getComments: (photoId) => request(`/api/photos/${photoId}/comments`),
  addComment: (photoId, userId, comment) =>
    request(`/api/photos/${photoId}/comments`, json('POST', { userId, comment })),
  deleteComment: (id, userId) => request(`/api/comments/${id}`, json('DELETE', { userId })),
};