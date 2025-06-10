import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { ThemeContext } from '../contexts/ThemeContext';

function BuyStockPage({ onGoBack, stockInfo }) {
  const [shares, setShares] = useState(1); // 购买股数，默认1股
  const [paymentMethod, setPaymentMethod] = useState('debit_card'); // 支付方式，默认借记卡
  const { theme, toggleTheme } = useContext(ThemeContext);

  // 提供一个默认的股票信息，以防stockInfo未成功传递或价格无效
  const defaultStockInfo = {
    close: 170.00, // 合理的默认价格
    symbol: 'AAPL',
    name: 'Apple Inc.',
    logo: '/images/apple.png',
  };

  // 确定实际使用的股票信息：如果传入的stockInfo有效，则使用它；否则使用默认值
  const effectiveStockInfo = (stockInfo && stockInfo.close !== undefined && stockInfo.close !== null && stockInfo.close !== 0)
    ? stockInfo
    : defaultStockInfo;

  const currentPrice = effectiveStockInfo.close; 
  const stockSymbol = effectiveStockInfo.symbol;
  const stockName = effectiveStockInfo.name;
  const stockLogo = effectiveStockInfo.logo;

  // 模拟费用
  const fee = 2.10; 
  // 计算总金额
  const total = (shares * currentPrice + fee).toFixed(2);

  const handleConfirmOrder = () => {
    alert(`Confirm purchase of ${shares} shares of ${stockSymbol} for a total of $${total}, paying with ${paymentMethod === 'debit_card' ? 'Debit Card' : 'Apple Pay'}.`);
    // 这里可以添加实际的购买逻辑
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Header />
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
        {/* 顶部返回和标题 */}
        <button
          onClick={onGoBack}
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
        <div style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 24, color: 'var(--text-color)' }}>Confirm Order</div>

        {/* 股票信息卡片 */}
        <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 16, display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <img src={stockLogo} alt={stockSymbol} style={{ width: 44, height: 44, borderRadius: 12, objectFit: 'contain', marginRight: 14, background: 'var(--bg-color)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--text-color)' }}>{stockSymbol}</div>
            <div style={{ color: 'var(--secondary-text-color)', fontSize: 15 }}>{stockName}</div>
          </div>
          <div style={{ fontWeight: 'bold', fontSize: 20, color: 'var(--text-color)' }}>${currentPrice.toFixed(2)}</div>
        </div>

        {/* 订单详情 */}
        <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: '18px 24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: 'var(--secondary-text-color)', fontSize: 15 }}>Funding source</span>
            <span style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: 15 }}>Stockup</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: 'var(--secondary-text-color)', fontSize: 15 }}>Approx share price</span>
            <span style={{ fontWeight: 'bold', fontSize: 15, color: 'var(--text-color)' }}>${currentPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ color: 'var(--secondary-text-color)', fontSize: 15 }}>Approx shares</span>
            <input
              type="number"
              min="1"
              value={shares}
              onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
              style={{
                width: 80,
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                fontSize: 15,
                textAlign: 'right',
                background: 'var(--bg-color)',
                color: 'var(--text-color)'
              }}
            />
          </div>
          <div style={{ borderBottom: '1px dashed var(--border-color)', margin: '12px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: 'var(--secondary-text-color)', fontSize: 15 }}>Fee</span>
            <span style={{ fontWeight: 'bold', fontSize: 15, color: 'var(--text-color)' }}>${fee.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--text-color)' }}>Total</span>
            <span style={{ fontWeight: 'bold', fontSize: 20, color: 'var(--primary-color)' }}>${total}</span>
          </div>
        </div>

        {/* 支付方式 */}
        <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, color: 'var(--text-color)' }}>Payment method</div>
        <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: '6px 0', marginBottom: 32 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 18px',
              borderBottom: '1px solid var(--border-color)',
              cursor: 'pointer',
            }}
            onClick={() => setPaymentMethod('debit_card')}
          >
            <span style={{ fontSize: 22, marginRight: 16 }}>💳</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, color: 'var(--text-color)' }}>Debit Card</div>
              <div style={{ color: 'var(--secondary-text-color)', fontSize: 13 }}>Deposit & Invest right from your debit card</div>
            </div>
            <input type="radio" name="payment" value="debit_card" checked={paymentMethod === 'debit_card'} onChange={() => {}} style={{ transform: 'scale(1.2)', accentColor: 'var(--primary-color)' }} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 18px',
              cursor: 'pointer',
            }}
            onClick={() => setPaymentMethod('apple_pay')}
          >
            <span style={{ fontSize: 22, marginRight: 16 }}></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, color: 'var(--text-color)' }}>Apple Pay</div>
              <div style={{ color: 'var(--secondary-text-color)', fontSize: 13 }}>Connect your Apple Pay account</div>
            </div>
            <input type="radio" name="payment" value="apple_pay" checked={paymentMethod === 'apple_pay'} onChange={() => {}} style={{ transform: 'scale(1.2)', accentColor: 'var(--primary-color)' }} />
          </div>
        </div>

        {/* 确认订单按钮 */}
        <button
          onClick={handleConfirmOrder}
          style={{
            width: '100%',
            background: 'var(--primary-color)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            border: 'none',
            borderRadius: 12,
            padding: '16px 0',
            marginBottom: 24,
            boxShadow: '0 4px 16px var(--shadow-color-dark)',
            cursor: 'pointer',
            letterSpacing: 1.2,
          }}
        >
          Confirm order
        </button>
      </div>
    </div>
  );
}

export default BuyStockPage; 