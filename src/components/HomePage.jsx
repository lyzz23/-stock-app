import React, { useContext } from 'react';
import Header from './Header';
import { ThemeContext } from '../contexts/ThemeContext';

const mockUser = {
  name: 'Alex',
  account: 'alex123',
};

const mockAssets = {
  total: '$25,800.00',
  profit: '+$1,200.00 (4.9%)',
};

const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$189.56', change: '+1.23%', color: '#4caf50', trendPoints: '5,27 15,18 25,22 35,10 45,14 55,7' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: '$720.30', change: '-0.85%', color: '#f44336', trendPoints: '5,12 15,18 25,10 35,22 45,14 55,27' },
  { symbol: 'AMZN', name: 'Amazon.com', price: '$3,250.00', change: '+0.45%', color: '#4caf50', trendPoints: '5,20 15,14 25,18 35,12 45,18 55,10' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$2,850.00', change: '+0.12%', color: '#4caf50', trendPoints: '5,25 15,22 25,18 35,20 45,16 55,19' },
];

const mockTopMovers = {
  gainers: [
    { symbol: 'NVDA', change: '+3.5%', price: '$480.20' },
    { symbol: 'MSFT', change: '+2.1%', price: '$350.50' },
  ],
  losers: [
    { symbol: 'NFLX', change: '-1.8%', price: '$410.75' },
    { symbol: 'ZM', change: '-2.5%', price: '$65.10' },
  ],
};

const mockEconomicEvents = [
  { date: 'Oct 26', event: 'ECB Interest Rate Decision' },
  { date: 'Nov 01', event: 'US Unemployment Rate' },
  { date: 'Nov 15', event: 'CPI Data Release' },
];

function HomePage(props) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Header />
      <div style={{ width: '90%', maxWidth: 1000, margin: '0 auto', padding: '0 16px', position: 'relative' }}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: 24,
            right: 80, // Adjust position to be next to profile icon
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
        {/* Bell Icon */}
        <img
          src="/images/Group 237616.png"
          alt="Notifications"
          style={{
            width: 24,
            height: 24,
            position: 'absolute',
            top: 24,
            right: 0,
            cursor: 'pointer',
            zIndex: 2
          }}
        />
        {/* Profile Icon - New */}
        <img
          src="/images/bg.png"
          alt="Profile"
          style={{
            width: 24,
            height: 24,
            position: 'absolute',
            top: 24,
            right: 40,
            cursor: 'pointer',
            zIndex: 2
          }}
          onClick={props.onGoProfile}
        />
        {/* Welcome & Account Info */}
        <div style={{ marginTop: 24, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src="/images/bg.png"
            alt="User Avatar"
            style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', background: 'var(--border-color)', boxShadow: '0 2px 8px var(--shadow-color-light)' }}
          />
          <div>
            <div style={{ fontSize: 22, fontWeight: 'bold', color: 'var(--text-color)' }}>
              Welcome back, {mockUser.name}!
            </div>
            <div style={{ color: 'var(--secondary-text-color)', fontSize: 15, marginTop: 4 }}>
              Account: {mockUser.account}
            </div>
          </div>
        </div>
        {/* Asset Overview Card */}
        <div
          style={{
            background: 'var(--card-bg)',
            borderRadius: 16,
            boxShadow: '0 2px 12px var(--shadow-color-light)',
            padding: 24,
            marginBottom: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s',
          }}
          onClick={props.onGoPortfolio}
          onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 24px var(--shadow-color-dark)'}
          onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 12px var(--shadow-color-light)'}
        >
          <div style={{ fontSize: 16, color: 'var(--secondary-text-color)', marginBottom: 8 }}>Total Assets</div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: 6 }}>{mockAssets.total}</div>
          <div style={{ fontSize: 16, color: mockAssets.profit.startsWith('+') ? 'var(--positive-change-color)' : 'var(--negative-change-color)' }}>{mockAssets.profit}</div>
        </div>
        {/* Stock List */}
        <div style={{ marginBottom: 16, fontWeight: 'bold', color: 'var(--primary-color)', fontSize: 18 }}>Market Watch</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mockStocks.map(stock => (
            <div
              key={stock.symbol}
              style={{
                background: 'var(--card-bg)',
                borderRadius: 16,
                boxShadow: '0 2px 8px var(--shadow-color-light)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
              onClick={() => props.onGoStockDetail(stock.symbol)}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 24px var(--shadow-color-dark)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow-color-light)'}
            >
              {/* 公司logo */}
              <img
                src={`/images/logo-${stock.symbol.toLowerCase()}.png`}
                alt={stock.symbol}
                style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-color)', objectFit: 'contain', marginRight: 12 }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              {/* 公司信息 */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: 16 }}>{stock.name}</div>
                <div style={{ color: 'var(--secondary-text-color)', fontSize: 14 }}>{stock.symbol}</div>
              </div>
              {/* 价格和涨跌幅 */}
              <div style={{ textAlign: 'right', minWidth: 90 }}>
                <div style={{ fontWeight: 'bold', fontSize: 16 }}>{stock.price}</div>
                <div style={{ color: stock.color, fontSize: 14 }}>{stock.change}</div>
              </div>
              {/* 小型趋势折线图 */}
              <svg width="60" height="32" viewBox="0 0 60 32" style={{ marginLeft: 12 }}>
                <polyline
                  fill="none"
                  stroke={stock.color}
                  strokeWidth="2"
                  points={stock.trendPoints}
                  opacity="0.8"
                />
                {(() => {
                  const lastPoint = stock.trendPoints.split(' ').pop().split(',');
                  return <circle cx={lastPoint[0]} cy={lastPoint[1]} r="2" fill={stock.color} />;
                })()}
              </svg>
            </div>
          ))}
        </div>
        {/* 新增两列信息面板 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, marginTop: 32, marginBottom: 20 }}>
          {/* Top Gainers & Losers */}
          <div style={{ flex: 1, background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--primary-color)', marginBottom: 15 }}>Top Movers</div>
            <div style={{ marginBottom: 15 }}>
              <div style={{ fontWeight: 'bold', fontSize: 16, color: 'var(--positive-change-color)', marginBottom: 8 }}>Gainers</div>
              {// 模拟涨幅榜数据
              mockTopMovers.gainers.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 5 }}>
                  <span>{item.symbol}</span>
                  <span style={{ color: 'var(--positive-change-color)' }}>{item.change} ({item.price})</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 16, color: 'var(--negative-change-color)', marginBottom: 8 }}>Losers</div>
              {// 模拟跌幅榜数据
              mockTopMovers.losers.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 5 }}>
                  <span>{item.symbol}</span>
                  <span style={{ color: 'var(--negative-change-color)' }}>{item.change} ({item.price})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Economic Calendar */}
          <div style={{ flex: 1, background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--primary-color)', marginBottom: 15 }}>Economic Calendar</div>
            {// 模拟财经日历数据
            mockEconomicEvents.map((event, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8, borderBottom: '1px dashed var(--border-color)', paddingBottom: 8 }}>
                <span style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>{event.date}</span>
                <span style={{ color: 'var(--secondary-text-color)' }}>{event.event}</span>
              </div>
            ))}
            <div style={{ fontSize: 13, color: 'var(--secondary-text-color)', marginTop: 15, textAlign: 'center' }}>
              More events can be added here...
            </div>
          </div>
        </div>
        {/* 新增信息区域 */}
        <div style={{ marginTop: 32 }}>
          {/* Stock News */}
          <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20, marginBottom: 20 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--primary-color)', marginBottom: 12 }}>Stock News</div>
            <p style={{ fontSize: 14, color: 'var(--text-color)', lineHeight: 1.6 }}>
              Here you will find the latest stock market news and hot analyses to help you stay updated.
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: 20, fontSize: 14, color: 'var(--text-color)' }}>
              <li style={{ marginBottom: 5 }}>[News Headline 1] Company X releases latest financial report, stock price rises</li>
              <li>[News Headline 2] Global economic outlook and its impact on financial markets</li>
            </ul>
          </div>

          {/* Financial Insights */}
          <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20, marginBottom: 20 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--primary-color)', marginBottom: 12 }}>Financial Insights</div>
            <p style={{ fontSize: 14, color: 'var(--text-color)', lineHeight: 1.6 }}>
              Get macroeconomic data, policy interpretations, and industry reports to gain market insights.
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: 20, fontSize: 14, color: 'var(--text-color)' }}>
              <li style={{ marginBottom: 5 }}>[Finance Hot Topic 1] Latest inflation rate data released</li>
              <li>[Finance Hot Topic 2] Analysis of central bank monetary policy adjustments</li>
            </ul>
          </div>

          {/* Promotional Ad */}
          <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20, marginBottom: 20, textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--primary-color)', marginBottom: 12 }}>Promotional Ad</div>
            <p style={{ fontSize: 14, color: 'var(--text-color)', lineHeight: 1.6 }}>
              Tailored financial product recommendations to discover more investment opportunities.
            </p>
            <img src="/images/ad.jfif" alt="Advertisement" style={{ maxWidth: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginTop: 15 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 