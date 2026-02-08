import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      onRegister();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handleChange} required minLength={6} />
      <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Register;
