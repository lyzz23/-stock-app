import React, { useState, useContext } from 'react';
import Header from './Header';
import { ThemeContext } from '../contexts/ThemeContext';

function RegisterPage({ onRegister, onGoLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    onRegister && onRegister(username, email, password);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'url(/images/4. Sign Up - Empty State.png) center center / cover no-repeat',
      backgroundColor: 'var(--bg-color)', // Fallback for background image
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Header />
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          background: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: 14,
          zIndex: 2
        }}
      >
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <img
          src="/images/Group 18300.png"
          alt="Decoration"
          style={{
            width: 200,
            marginBottom: 24,
            marginTop: 24,
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: 'var(--primary-color)', letterSpacing: 1, marginBottom: 8 }}>
            Join StockPilot
          </div>
          <div style={{ fontSize: 16, color: 'var(--text-color)', marginBottom: 6 }}>
            Create your account to start investing smarter.
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          width: 320,
          gap: 20,
          background: 'var(--card-bg)',
          padding: 36,
          borderRadius: 16,
          boxShadow: '0 4px 24px var(--shadow-color-light)',
          marginTop: 8
        }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              padding: 14,
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)', // Input background
              color: 'var(--text-color)' // Input text color
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: 14,
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)', // Input background
              color: 'var(--text-color)' // Input text color
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              padding: 14,
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)', // Input background
              color: 'var(--text-color)' // Input text color
            }}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{
              padding: 14,
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)', // Input background
              color: 'var(--text-color)' // Input text color
            }}
            required
          />
          <button type="submit" style={{
            padding: 14,
            fontSize: 16,
            borderRadius: 8,
            border: 'none',
            background: 'var(--primary-color)',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: 8,
            boxShadow: '0 2px 8px var(--shadow-color-dark)',
            letterSpacing: 2
          }}>
            Register
          </button>
        </form>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <img
            src="/images/Group 237614.png"
            alt="Google and Apple Login"
            style={{ width: 320, marginBottom: 12, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button
              type="button"
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-color)',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 1px 4px var(--shadow-color-light)',
                fontSize: 15
              }}
              onClick={() => alert('Google login is under development.')}
            >
              Google
            </button>
            <button
              type="button"
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                color: 'var(--text-color)',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 1px 4px var(--shadow-color-light)',
                fontSize: 15
              }}
              onClick={() => alert('Apple login is under development.')}
            >
              Apple
            </button>
          </div>
        </div>
        <div style={{ marginTop: 28, color: 'var(--text-color)', fontSize: 15, textShadow: '0 2px 8px var(--shadow-color-dark)' }}>
          Already have an account?{' '}
          <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }} onClick={onGoLogin}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage; 