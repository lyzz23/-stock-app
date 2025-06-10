import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function ProfileSecurity({ onBack }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', padding: '0 16px', position: 'relative' }}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: 24,
            right: 0,
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
        <button
          onClick={onBack}
          style={{
            margin: '24px 0 12px 0',
            background: 'none',
            border: 'none',
            color: 'var(--primary-color)',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: 0,
          }}
        >
          ← Back
        </button>
        <div style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 18, color: 'var(--text-color)' }}>Security</div>
        <div style={{ background: 'var(--card-bg)', borderRadius: 12, padding: 18, fontSize: 16, color: 'var(--text-color)' }}>
          这里是安全设置内容（你可以自定义内容）
        </div>
      </div>
    </div>
  );
}

export default ProfileSecurity; 