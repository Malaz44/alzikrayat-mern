import { useState } from 'react';

// onAdd saves the comment and returns true if it worked
export default function CommentForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const saved = await onAdd(text);
    // clear the box only after the comment is saved
    if (saved) setText('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={500}
        required
      />
      <button type="submit">Add comment</button>
    </form>
  );
}