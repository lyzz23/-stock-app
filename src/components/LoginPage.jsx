import React, { useState, useContext } from 'react';
import Header from './Header';
import { ThemeContext } from '../contexts/ThemeContext';

function LoginPage({ onLogin, onGoRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin && onLogin(username, password);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'url(/images/Onboarding - 11.png) center center / cover no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'var(--bg-color)' // Fallback for background image
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
          alt="装饰图片"
          style={{
            width: 200,
            marginBottom: 24,
            marginTop: 24,
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          tabIndex="-1"
        />
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: 'var(--primary-color)', letterSpacing: 1, marginBottom: 8 }}>
            Stock trading suit
          </div>
          <div style={{ fontSize: 16, color: 'var(--text-color)', marginBottom: 6 }}>
            Streamline your investment decisions with expert guidance.
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
          marginTop: 32
        }}>
          <input
            type="text"
            placeholder="Username or Email"
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
            Login
          </button>
        </form>
        <div style={{ marginTop: 28, color: 'var(--text-color)', fontSize: 15, textShadow: '0 2px 8px var(--shadow-color-dark)' }}>
          Don't have an account?{' '}
          <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }} onClick={onGoRegister}>
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 