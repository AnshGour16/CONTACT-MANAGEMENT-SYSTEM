


import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
import './Login.css';

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSubmitError('');
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setSubmitError('');
      try {
        const res = await axios.post(`${API_URL}/api/auth/login`, form);
        localStorage.setItem('token', res.data.token);
        if (onLogin) onLogin();
      } catch (err) {
        setSubmitError(err.response?.data?.error || 'Login failed');
      }
      setLoading(false);
    } else {
      setSubmitError('Please fix the errors above.');
    }
  };

  const handleSocial = (provider) => {
    console.log(`Social login clicked: ${provider}`);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="show-hide"
              onClick={handleShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit" className="login-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        {submitError && <div className="error submit-error">{submitError}</div>}
        <div className="social-section">
          <div className="social-label">Or sign in with:</div>
          <div className="social-buttons">
            <button type="button" onClick={() => handleSocial('Google')} className="social-btn google">Google</button>
            <button type="button" onClick={() => handleSocial('Facebook')} className="social-btn facebook">Facebook</button>
            <button type="button" onClick={() => handleSocial('GitHub')} className="social-btn github">GitHub</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
