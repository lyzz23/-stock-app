import React from 'react';

function Header() {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '16px 0',
      background: '#fff',
      boxShadow: '0 2px 8px #0001',
      marginBottom: 32
    }}>
      <img
        src="/images/icon.png"
        alt="App图标"
        style={{ height: 40, marginLeft: 24 }}
      />
      <span style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1976d2',
        marginLeft: 16
      }}>
        StockPilot
      </span>
    </div>
  );
}

export default Header;