import React, { useState } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PortfolioPage from './components/PortfolioPage';
import AppleDetailPage from './components/AppleDetailPage';
import ProfilePage from './components/ProfilePage';
import ProfileAccount from './components/ProfileAccount';
import ProfileSecurity from './components/ProfileSecurity';
import ProfilePayments from './components/ProfilePayments';
import ProfileLanguage from './components/ProfileLanguage';
import ProfileSettings from './components/ProfileSettings';
import ProfileFAQ from './components/ProfileFAQ';
import BuyStockPage from './components/BuyStockPage';

function App() {
  const [page, setPage] = useState('login');
  const [currentStock, setCurrentStock] = useState(null);

  const handleLogin = (username, password) => {
    // 这里可以加登录逻辑，暂时直接跳转主页
    setPage('home');
  };

  const handleGoRegister = () => {
    setPage('register');
  };

  const handleGoLogin = () => {
    setPage('login');
  };

  const handleGoPortfolio = () => {
    setPage('portfolio');
  };

  const handleGoHome = () => {
    setPage('home');
  };

  const handleGoAppleDetail = () => {
    setPage('apple-detail');
  };

  const handleGoStockDetail = (symbol) => {
    // 目前只支持AAPL，后续可扩展
    if (symbol === 'AAPL') setPage('apple-detail');
    // 其他股票可后续扩展
  };

  // 新增：Profile相关页面跳转逻辑
  const handleGoProfile = () => setPage('profile');
  const handleProfileNavigate = (sub) => setPage('profile-' + sub);
  const handleProfileBack = () => setPage('profile');

  // 新增：购买股票页面跳转逻辑
  const handleGoBuyStock = (stockData) => {
    setCurrentStock(stockData);
    setPage('buy-stock');
  };

  const handleBuyStockBack = () => {
    setPage('apple-detail'); // 从购买页返回到苹果详情页
  };

  if (page === 'login') {
    return <LoginPage onLogin={handleLogin} onGoRegister={handleGoRegister} />;
  }
  if (page === 'register') {
    return <RegisterPage onGoLogin={handleGoLogin} />;
  }
  if (page === 'apple-detail') {
    return <AppleDetailPage onGoBack={() => setPage('portfolio')} onGoBuyStock={handleGoBuyStock} />;
  }
  if (page === 'portfolio') {
    return <PortfolioPage onGoHome={handleGoHome} onGoAppleDetail={handleGoAppleDetail} />;
  }
  // 新增：Profile及子页面路由
  if (page === 'profile') return <ProfilePage onNavigate={handleProfileNavigate} onGoHome={handleGoHome} />;
  if (page === 'profile-account') return <ProfileAccount onBack={handleProfileBack} />;
  if (page === 'profile-security') return <ProfileSecurity onBack={handleProfileBack} />;
  if (page === 'profile-payments') return <ProfilePayments onBack={handleProfileBack} />;
  if (page === 'profile-language') return <ProfileLanguage onBack={handleProfileBack} />;
  if (page === 'profile-settings') return <ProfileSettings onBack={handleProfileBack} />;
  if (page === 'profile-faq') return <ProfileFAQ onBack={handleProfileBack} />;

  // 新增：购买股票页面路由
  if (page === 'buy-stock') {
    return <BuyStockPage onGoBack={handleBuyStockBack} stockInfo={currentStock} />;
  }

  return <HomePage onGoPortfolio={handleGoPortfolio} onGoStockDetail={handleGoStockDetail} onGoProfile={handleGoProfile} />;
}

export default App; 