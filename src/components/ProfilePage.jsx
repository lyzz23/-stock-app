import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const user = {
  name: 'Konrad francisco',
  email: 'konradfrancisco@gmail.de',
  avatar: '/images/bg.png', // 沿用你指定的 bg.png 作为头像
};

function ProfilePage({ onNavigate, onGoHome }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', paddingBottom: 60 }}>
      <div style={{ maxWidth: 420, margin: '0 auto', padding: '0 16px', position: 'relative' }}>
        {/* 返回主页按钮 - 新增 */}
        <button
          onClick={onGoHome}
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
          ← Back to Home
        </button>
        <div style={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center', margin: '12px 0 12px 0', color: 'var(--text-color)' }}>Profile</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
          <img src={user.avatar} alt="avatar" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', marginBottom: 10 }} />
          <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--text-color)' }}>{user.name}</div>
          <div style={{ color: 'var(--secondary-text-color)', fontSize: 15 }}>{user.email}</div>
        </div>
        {/* Invite friends */}
        <div
          style={{
            background: 'var(--card-bg)',
            borderRadius: 14,
            boxShadow: '0 2px 8px var(--shadow-color-light)',
            padding: '16px 18px',
            marginBottom: 18,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: 16, flex: 1, color: 'var(--text-color)' }}>Invite friends</span>
          <span style={{ color: 'var(--secondary-text-color)', fontSize: 14 }}>Invite your friends and get $15</span>
        </div>
        {/* 菜单列表 */}
        <div style={{ background: 'var(--card-bg)', borderRadius: 14, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: '6px 0' }}>
          <MenuItem icon="👤" label="Account" onClick={() => onNavigate('account')} />
          <MenuItem icon="🔒" label="Security" onClick={() => onNavigate('security')} />
          <MenuItem icon="💳" label="Billing / Payments" onClick={() => onNavigate('payments')} />
          <MenuItem icon="🌐" label="Language" right="English" onClick={() => onNavigate('language')} />
          <MenuItem icon="⚙️" label="Settings" onClick={() => onNavigate('settings')} />
          <MenuItem icon="❓" label="FAQ" onClick={() => onNavigate('faq')} />
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, right, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '14px 18px',
        borderBottom: '1px solid var(--border-color)',
        cursor: 'pointer'
      }}
    >
      <span style={{ fontSize: 22, marginRight: 16 }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 16, color: 'var(--text-color)' }}>{label}</span>
      {right && <span style={{ color: 'var(--secondary-text-color)', fontSize: 15, marginRight: 8 }}>{right}</span>}
      <span style={{ fontSize: 18, color: 'var(--secondary-text-color)' }}>›</span>
    </div>
  );
}

export default ProfilePage; 