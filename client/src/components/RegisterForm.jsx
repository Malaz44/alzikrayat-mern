import { useState } from 'react';
import { api } from '../api.js';

// onRegistered runs after the account is created, onSwitch shows the login form
export default function RegisterForm({ onSwitch, onRegistered }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.register(form);
      onRegistered();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={handleChange} required />
      <input name="location" placeholder="Location (optional)" value={form.location} onChange={handleChange} />
      <input name="occupation" placeholder="Occupation (optional)" value={form.occupation} onChange={handleChange} />
      <textarea name="description" placeholder="About you (optional)" value={form.description} onChange={handleChange} />
      <button type="submit">Register</button>
      <p>
        Already have an account?{' '}
        <button type="button" className="link" onClick={onSwitch}>Login</button>
      </p>
    </form>
  );
}