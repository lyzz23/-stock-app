import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // 尝试从 localStorage 获取主题，如果不存在，则默认为 'light'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  useEffect(() => {
    // 根据当前主题设置CSS变量
    const root = document.documentElement; // 或者 document.body
    if (theme === 'dark') {
      root.style.setProperty('--bg-color', '#282c34');
      root.style.setProperty('--text-color', '#e0e0e0');
      root.style.setProperty('--card-bg', '#3a3f4a');
      root.style.setProperty('--primary-color', '#61dafb');
      root.style.setProperty('--secondary-text-color', '#bbbbbb');
      root.style.setProperty('--border-color', '#444850');
      root.style.setProperty('--positive-change-color', '#66bb6a');
      root.style.setProperty('--negative-change-color', '#ef5350');
      root.style.setProperty('--shadow-color-light', 'rgba(0, 0, 0, 0.2)');
      root.style.setProperty('--shadow-color-dark', 'rgba(0, 0, 0, 0.4)');
      root.style.setProperty('--chart-stroke-color', '#61dafb');
    } else {
      root.style.setProperty('--bg-color', '#f5f6fa');
      root.style.setProperty('--text-color', '#222');
      root.style.setProperty('--card-bg', '#fff');
      root.style.setProperty('--primary-color', '#1976d2');
      root.style.setProperty('--secondary-text-color', '#888');
      root.style.setProperty('--border-color', '#eee');
      root.style.setProperty('--positive-change-color', '#4caf50');
      root.style.setProperty('--negative-change-color', '#f44336');
      root.style.setProperty('--shadow-color-light', 'rgba(0, 0, 0, 0.05)');
      root.style.setProperty('--shadow-color-dark', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--chart-stroke-color', '#1976d2');
    }
    // 将当前主题保存到 localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 