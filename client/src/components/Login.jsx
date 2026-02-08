

import React, { useState } from 'react';
import './Login.css';

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSubmitError('');
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Login form data:', form);
      setSubmitError('');
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
        <button type="submit" className="login-btn">Login</button>
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
