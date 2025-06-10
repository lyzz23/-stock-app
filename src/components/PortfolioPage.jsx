import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { ThemeContext } from '../contexts/ThemeContext';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
  Cell,
  Brush,
  Legend,
  PieChart,
  Pie,
  Cell as PieCell
} from 'recharts';
// import axios from 'axios'; // 暂时注释，因为用户之前决定使用模拟数据

const assetHistory = [
  20000, 20800, 21500, 22000, 22500, 23000, 23500, 24000, 24500, 25000, 25500, 25800
];
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const minAsset = 20000;
const maxAsset = 26000;
const svgWidth = 320;
const svgHeight = 100;
const leftPadding = 36;
const rightPadding = 12;
const topPadding = 16;
const bottomPadding = 28;
const chartWidth = svgWidth - leftPadding - rightPadding;
const chartHeight = svgHeight - topPadding - bottomPadding;

// 生成2023年3月到2024年3月每月1号递增数据
function generateKlineData() {
  const data = [];
  let price = 10000 + Math.random() * 5000;
  let currentDate = new Date(2023, 2, 1); // Start from March 1, 2023 (Month is 0-indexed)

  for (let i = 0; i < 13; i++) { // 13 months for 1 year + 1 month (Mar 2023 to Mar 2024)
    const date = new Date(currentDate.getTime()); // Clone the date object
    let open = price;
    let change = (Math.random() - 0.5) * 0.8; // -40%~+40%
    let close = Math.round(open * (1 + change));
    let high = Math.max(open, close) + Math.round(Math.random() * 2000);
    let low = Math.min(open, close) - Math.round(Math.random() * 2000);

    data.push({
      date: date.getTime(), // Store as Unix timestamp (milliseconds)
      displayDate: date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), // For tooltip display
      open,
      close,
      high,
      low,
      diff: close - open
    });
    price = close;
    currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
  }
  return data;
}
const klineData = generateKlineData();

function getSmoothPath(points) {
  // 贝塞尔平滑曲线算法
  let d = '';
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    if (i === 0) {
      d = `M${x},${y}`;
    } else {
      const [prevX, prevY] = points[i - 1];
      const cpx = (prevX + x) / 2;
      d += ` Q${cpx},${prevY} ${x},${y}`;
    }
  }
  return d;
}

function getChartPoints() {
  return assetHistory.map((v, i) => {
    const x = leftPadding + (i * chartWidth) / (assetHistory.length - 1);
    const y = topPadding + (1 - (v - minAsset) / (maxAsset - minAsset)) * chartHeight;
    return [x, y];
  });
}

const mockPortfolio = {
  total: '$25,800.00',
  profit: '+$1,200.00 (4.9%)',
  monthChange: '+$1,200.00',
  monthChangePercent: '+4.9%',
  positions: [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      logo: '/images/logo-aapl.png',
      chart: '/images/apple.png',
      shares: 50,
      value: '$9,478.00',
      profit: '+$320.00',
      profitColor: '#4caf50',
      monthChange: '+3.5%',
      dayChange: '+0.8%',
      trend: '0,40 10,32 20,28 30,22 40,18 50,12 60,10',
    },
    {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      logo: '/images/logo-tsla.png',
      chart: '/images/tesla.png',
      shares: 20,
      value: '$14,406.00',
      profit: '+$700.00',
      profitColor: '#4caf50',
      monthChange: '+5.2%',
      dayChange: '-0.3%',
      trend: '0,20 10,18 20,22 30,28 40,24 50,20 60,18',
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com',
      logo: '/images/logo-amzn.png',
      chart: '/images/amzon.png',
      shares: 5,
      value: '$1,916.00',
      profit: '+$180.00',
      profitColor: '#4caf50',
      monthChange: '+2.1%',
      dayChange: '+0.1%',
      trend: '0,30 10,28 20,26 30,24 40,22 50,20 60,22',
    },
  ],
};

// 计算涨跌率
function calcChangeRate(data, period) {
  if (data.length < period) return null;
  const start = data[data.length - period].open;
  const end = data[data.length - 1].close;
  const rate = ((end - start) / start) * 100;
  return rate;
}
const changeRates = [
  { label: '6M', value: calcChangeRate(klineData, 12) },
  { label: '3M', value: calcChangeRate(klineData, 6) },
  { label: '1M', value: calcChangeRate(klineData, 4) },
  { label: '1W', value: calcChangeRate(klineData, 2) },
  { label: '1D', value: calcChangeRate(klineData, 1) },
];

// 资产分布数据
const allocationData = mockPortfolio.positions.map(pos => ({
  name: pos.symbol,
  value: parseFloat(pos.value.replace(/[$,]/g, '')),
  color: pos.symbol === 'AAPL' ? '#1976d2' : pos.symbol === 'TSLA' ? '#4caf50' : '#fbc02d',
}));
const totalValue = allocationData.reduce((sum, d) => sum + d.value, 0);

// 近期操作记录
const recentActivity = [
  { type: 'Buy', symbol: 'AAPL', shares: 10, date: '2024-03-01', amount: 1895, color: '#1976d2' },
  { type: 'Sell', symbol: 'TSLA', shares: 5, date: '2024-02-20', amount: 3600, color: '#f44336' },
  { type: 'Dividend', symbol: 'AAPL', shares: 0, date: '2024-02-10', amount: 50, color: '#4caf50' },
  { type: 'Buy', symbol: 'GOOGL', shares: 2, date: '2024-01-25', amount: 5700, color: '#1976d2' },
  { type: 'Sell', symbol: 'AMZN', shares: 1, date: '2024-01-15', amount: 1916, color: '#f44336' },
  { type: 'Deposit', symbol: 'Cash', shares: 0, date: '2024-01-05', amount: 1000, color: '#4caf50' },
  { type: 'Buy', symbol: 'MSFT', shares: 5, date: '2023-12-28', amount: 1750, color: '#1976d2' },
  { type: 'Sell', symbol: 'NVDA', shares: 2, date: '2023-12-15', amount: 960, color: '#f44336' },
  { type: 'Dividend', symbol: 'TSLA', shares: 0, date: '2023-12-01', amount: 30, color: '#4caf50' },
  { type: 'Buy', symbol: 'FB', shares: 8, date: '2023-11-20', amount: 2400, color: '#1976d2' },
  { type: 'Sell', symbol: 'NFLX', shares: 3, date: '2023-11-10', amount: 1230, color: '#f44336' },
  { type: 'Deposit', symbol: 'Cash', shares: 0, date: '2023-11-01', amount: 500, color: '#4caf50' },
];

const mockMarketIndices = [
  { name: 'S&P 500', value: '5,200.23', change: '+0.56%', color: '#4caf50' },
  { name: 'Dow Jones', value: '39,800.12', change: '+0.32%', color: '#4caf50' },
  { name: 'Nasdaq', value: '17,800.55', change: '-0.15%', color: '#f44336' },
  { name: 'Russell 2000', value: '2,050.88', change: '+0.80%', color: '#4caf50' },
  { name: 'FTSE 100', value: '7,900.45', change: '-0.22%', color: '#f44336' },
  { name: 'Nikkei 225', value: '38,500.00', change: '+0.10%', color: '#4caf50' },
  { name: 'Euro Stoxx 50', value: '4,950.00', change: '+0.40%', color: '#4caf50' },
  { name: 'Hang Seng', value: '18,200.00', change: '-0.50%', color: '#f44336' },
  { name: 'Shanghai Comp', value: '3,080.00', change: '+0.25%', color: '#4caf50' },
];

const mockPortfolioNews = [
  { headline: 'Analyst upgrades AAPL target price.', date: '2024-03-05' },
  { headline: 'TSLA stock experiences slight recovery.', date: '2024-03-04' },
  { headline: 'AMZN announces new cloud computing features.', date: '2024-03-03' },
  { headline: 'Market volatility expected next week.', date: '2024-03-02' },
  { headline: 'Tech sector shows strong growth in Q1.', date: '2024-03-01' },
  { headline: 'Dividends paid by major companies this month.', date: '2024-02-28' },
  { headline: 'New regulations impacting financial services.', date: '2024-02-27' },
  { headline: 'Global trade tensions easing, positive for exports.', date: '2024-02-26' },
  { headline: 'Inflation concerns persist in Europe.', date: '2024-02-25' },
  { headline: 'Energy stocks surge on rising oil prices.', date: '2024-02-24' },
  { headline: 'Biotech breakthrough impacts healthcare sector.', date: '2024-02-23' },
  { headline: 'Retail sales show strong performance.', date: '2024-02-22' },
];

function PortfolioPage({ onGoHome, onGoAppleDetail }) {
  const [stockData, setStockData] = useState({}); // 重新引入以便后续可能恢复API
  const [loading, setLoading] = useState(false); // 暂时设为false，不显示加载提示
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [brushIndexes, setBrushIndexes] = useState({ startIndex: 0, endIndex: klineData.length - 1 });

  const handleBrushChange = ({ startIndex, endIndex }) => {
    setBrushIndexes({ startIndex, endIndex });
  };

  const filteredKlineData = klineData.slice(brushIndexes.startIndex, brushIndexes.endIndex + 1);

  // 自动统计最大涨幅和最大跌幅 (现在基于过滤后的数据)
  const currentMaxGain = Math.max(...filteredKlineData.map(d => d.diff));
  const currentMaxLoss = Math.min(...filteredKlineData.map(d => d.diff));
  const currentMaxGainDate = filteredKlineData.find(d => d.diff === currentMaxGain)?.displayDate;
  const currentMaxLossDate = filteredKlineData.find(d => d.diff === currentMaxLoss)?.displayDate;

  const chartPoints = getChartPoints(); // 用于旧版折线图，如果仍使用K线图则可能不需要
  const smoothPath = getSmoothPath(chartPoints);
  // 区域填充路径
  const areaPath = smoothPath +
    ` L${chartPoints[chartPoints.length - 1][0]},${svgHeight - bottomPadding}` +
    ` L${chartPoints[0][0]},${svgHeight - bottomPadding} Z`;
  const last = chartPoints[chartPoints.length - 1];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Header />
      <div style={{ width: '90%', maxWidth: 1000, margin: '0 auto', padding: '0 16px', position: 'relative' }}>
        {/* 返回首页按钮 */}
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

        <div style={{ /* display: 'flex', gap: 24, */ marginBottom: 24 }}>
          {/* 左侧列 - 资产总览卡片 */}
          <div style={{
            /* flex: 2, */
            background: 'var(--card-bg)',
            borderRadius: 16,
            boxShadow: '0 2px 12px var(--shadow-color-light)',
            padding: 24,
            marginBottom: 24, // 增加间距以适应上下布局
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <div style={{ fontSize: 16, color: 'var(--secondary-text-color)', marginBottom: 8 }}>Portfolio Value</div>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: 6 }}>{mockPortfolio.total}</div>
            <div style={{ fontSize: 16, color: mockPortfolio.profit.startsWith('+') ? 'var(--positive-change-color)' : 'var(--negative-change-color)', marginBottom: 6 }}>{mockPortfolio.profit}</div>
            <div style={{ fontSize: 14, color: 'var(--secondary-text-color)', marginBottom: 2 }}>Cash Balance: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>$2,000.00</span></div>
            <div style={{ fontSize: 14, color: 'var(--secondary-text-color)', marginBottom: 2 }}>Monthly Return: <span style={{ color: 'var(--positive-change-color)', fontWeight: 'bold' }}>+4.9%</span></div>
            <div style={{ fontSize: 14, color: 'var(--secondary-text-color)', marginBottom: 12 }}>Annualized Return: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>+12.3%</span></div>
                       {/* K线图 */}
                       <div style={{ width: '100%', height: 450, marginTop: 8, marginBottom: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={filteredKlineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis
                    dataKey="date" // Use the timestamp as dataKey
                    type="number" // Specify type as number for continuous axis
                    tickLine={false}
                    axisLine={{ stroke: 'var(--border-color)' }}
                    tick={{ fill: 'var(--secondary-text-color)', fontSize: 11 }}
                    tickFormatter={(value) => {
                      // Format timestamp back to desired string for display
                      const date = new Date(value);
                      const month = date.toLocaleString('en-US', { month: 'short' });
                      const year = date.getFullYear().toString().slice(2);
                      return `${month} '${year}`;
                    }}
                    domain={[klineData[0].date, klineData[klineData.length - 1].date]} // Set domain explicitly
                    ticks={klineData.map(d => d.date)} // 确保每个月都有一个刻度
                  />
                  <YAxis
                    yAxisId="price"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--primary-color)', fontSize: 12 }}
                    tickFormatter={value => `$${value}`}
                    domain={[
                      dataMin => Math.floor(dataMin * 0.95), // 最小价格的95%
                      dataMax => Math.ceil(dataMax * 1.05) // 最大价格的105%
                    ]}
                  />
                  <YAxis
                    yAxisId="volume"
                    orientation="left"
                    hide
                    domain={[0, 'auto']}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, fontSize: 13, background: 'var(--card-bg)', color: 'var(--text-color)', border: '1px solid var(--border-color)', boxShadow: '0 2px 12px var(--shadow-color-dark)' }}
                    labelStyle={{ color: 'var(--text-color)', fontWeight: 'bold' }}
                    formatter={(value, name, props) => {
                      if (name === 'volume') return [`${value} volume`];
                      const { payload } = props;
                      // Ensure payload exists and has necessary properties
                      if (!payload || !payload[0]) return null;
                      const dataPoint = klineData.find(d => d.date === payload[0].payload.date); // Find original data point for correct displayDate
                      if (!dataPoint) return null;

                      const isUp = dataPoint.close >= dataPoint.open;
                      const color = isUp ? 'var(--positive-change-color)' : 'var(--negative-change-color)';
                      return [
                        <span style={{ color: color }}>Open: ${dataPoint.open.toFixed(2)}</span>,
                        <span style={{ color: color }}>Close: ${dataPoint.close.toFixed(2)}</span>,
                        <span style={{ color: color }}>High: ${dataPoint.high.toFixed(2)}</span>,
                        <span style={{ color: color }}>Low: ${dataPoint.low.toFixed(2)}</span>,
                        `Volume: ${dataPoint.volume || 0}`,
                      ];
                    }}
                    labelFormatter={label => {
                      // Format timestamp back to desired string for tooltip label
                      const date = new Date(label);
                      const month = date.toLocaleString('en-US', { month: 'long' });
                      const day = date.getDate();
                      const year = date.getFullYear();
                      return <span style={{ color: 'var(--text-color)' }}>{`${month} ${day}, ${year}`}</span>;
                    }}
                  />
                  {/* 盈利/亏损柱状图 */}
                  <Bar yAxisId="volume" dataKey="diff" barSize={10} fill="var(--border-color)" radius={[4, 4, 0, 0]}>
                    {filteredKlineData.map((entry, index) => (
                      <Cell key={`cell-${entry.date}`} fill={entry.diff >= 0 ? 'var(--positive-change-color)' : 'var(--negative-change-color)'} />
                    ))}
                  </Bar>
                  {/* K线图的线（此处模拟为收盘价折线，实际K线图组件Recharts支持较复杂） */}
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="close"
                    stroke="var(--primary-color)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: 'var(--card-bg)', stroke: 'var(--primary-color)', strokeWidth: 2 }}
                  />
                  <Brush
                    data={klineData} // 明确传递完整的klineData给滑块
                    dataKey="date" // Use the timestamp for brush dataKey
                    height={30}
                    stroke="var(--primary-color)"
                    fill="var(--bg-color)"
                    travellerWidth={10}
                    gap={5}
                    x={40}
                    y={410}
                    tickFormatter={(value) => {
                      // Format timestamp for brush display
                      const date = new Date(value);
                      const month = date.toLocaleString('en-US', { month: 'short' });
                      const year = date.getFullYear().toString().slice(2);
                      return `${month} '${year}`;
                    }}
                    startIndex={brushIndexes.startIndex}
                    endIndex={brushIndexes.endIndex}
                    onChange={handleBrushChange}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            {/* Summary of Max Gain/Loss */}
            <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20, margin: '20px 0 0 0', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 14, color: 'var(--secondary-text-color)', marginBottom: 4 }}>Max Gain</div>
                <div style={{ fontSize: 18, fontWeight: 'bold', color: 'var(--positive-change-color)' }}>{`+$${currentMaxGain.toFixed(2)}` || 'N/A'}</div>
                <div style={{ fontSize: 12, color: 'var(--secondary-text-color)', marginTop: 4 }}>{currentMaxGainDate || 'N/A'}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: 'var(--secondary-text-color)', marginBottom: 4 }}>Max Loss</div>
                <div style={{ fontSize: 18, fontWeight: 'bold', color: 'var(--negative-change-color)' }}>{`-$${Math.abs(currentMaxLoss).toFixed(2)}` || 'N/A'}</div>
                <div style={{ fontSize: 12, color: 'var(--secondary-text-color)', marginTop: 4 }}>{currentMaxLossDate || 'N/A'}</div>
              </div>
            </div>
            <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20, margin: '20px 0 0 0', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 14, color: 'var(--secondary-text-color)', marginBottom: 4 }}>Max Gain</div>
                <div style={{ fontSize: 18, fontWeight: 'bold', color: 'var(--positive-change-color)' }}>{`+$${currentMaxGain.toFixed(2)}` || 'N/A'}</div>
                <div style={{ fontSize: 12, color: 'var(--secondary-text-color)', marginTop: 4 }}>{currentMaxGainDate || 'N/A'}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: 'var(--secondary-text-color)', marginBottom: 4 }}>Max Loss</div>
                <div style={{ fontSize: 18, fontWeight: 'bold', color: 'var(--negative-change-color)' }}>{`-$${Math.abs(currentMaxLoss).toFixed(2)}` || 'N/A'}</div>
                <div style={{ fontSize: 12, color: 'var(--secondary-text-color)', marginTop: 4 }}>{currentMaxLossDate || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* 右侧列 - 可以是资产分布或简单的信息卡片 */}
          <div style={{ /* flex: 1, */ display: 'flex', flexDirection: 'column', gap: 24 /*, minHeight: 'calc(100vh - 200px)' */ }}>
            {/* Portfolio Allocation Pie Chart */}
            <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20, textAlign: 'center', marginBottom: 24, flexGrow: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--primary-color)', marginBottom: 15 }}>Portfolio Allocation</div>
              <ResponsiveContainer width="100%" height={380}> {/* 增加高度以容纳外部标签和图例 */}
                <PieChart>
                  <Pie
                    data={allocationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={100}
                    innerRadius={60}
                    fill="var(--primary-color)"
                    labelLine={{ stroke: 'var(--secondary-text-color)', strokeWidth: 1 }} // 确保连接线可见
                    label={({ name, percent, cx, cy, midAngle, outerRadius, index }) => {
                      const RADIAN = Math.PI / 180;
                      // Calculate the position of the label slightly outside the pie slice
                      const radius = outerRadius + 45; // 增加距离，避免重叠
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="var(--text-color)"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize={13}
                          fontWeight="bold"
                        >
                          {`${name}: ${(percent * 100).toFixed(1)}%`}
                        </text>
                      );
                    }} // 自定义标签，确保不重叠并带有连接线
                  >
                    {allocationData.map((entry, index) => (
                      <PieCell key={`cell-${index}`} fill={entry.color === '#1976d2' ? 'var(--primary-color)' : entry.color === '#4caf50' ? 'var(--positive-change-color)' : '#fbc02d'} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 12, fontSize: 13, background: 'var(--card-bg)', color: 'var(--text-color)', border: '1px solid var(--border-color)', boxShadow: '0 2px 12px var(--shadow-color-dark)' }}
                    labelStyle={{ color: 'var(--text-color)', fontWeight: 'bold' }}
                    formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                  />
                  <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: 20, color: 'var(--text-color)' }} /> {/* 调整图例位置到下方水平居中，并增加顶部间距 */}
                </PieChart>
              </ResponsiveContainer>
              <div style={{ fontSize: 13, color: 'var(--secondary-text-color)', marginTop: 15 }}>
                Diversify your portfolio for better risk management.
              </div>
            </div>

            {/* Recent Activity Log */}
            <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20, marginBottom: 24, flexGrow: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--primary-color)', marginBottom: 15 }}>Recent Activity</div>
              {
                recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, marginBottom: 10, borderBottom: '1px dashed var(--border-color)', paddingBottom: 8 }}>
                      <span style={{ fontWeight: 'bold', color: activity.color === '#1976d2' ? 'var(--primary-color)' : activity.color === '#f44336' ? 'var(--negative-change-color)' : 'var(--positive-change-color)' }}>{activity.type} {activity.symbol}</span>
                      <span style={{ color: 'var(--secondary-text-color)' }}>{activity.date}</span>
                      <span style={{ fontWeight: 'bold', color: activity.color === '#1976d2' ? 'var(--primary-color)' : activity.color === '#f44336' ? 'var(--negative-change-color)' : 'var(--positive-change-color)' }}>{activity.type === 'Sell' ? '-' : '+'}${activity.amount.toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 14, color: 'var(--secondary-text-color)', textAlign: 'center' }}>No recent activity.</div>
                )
              }
              <div style={{ fontSize: 13, color: 'var(--secondary-text-color)', marginTop: 15, textAlign: 'center' }}>
                View all transactions in your account history.
              </div>
            </div>

            {/* Market Overview */}
            <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20, marginBottom: 24, flexGrow: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--primary-color)', marginBottom: 15 }}>Market Overview</div>
              {mockMarketIndices.map((index, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, marginBottom: 10, borderBottom: '1px dashed var(--border-color)', paddingBottom: 8 }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>{index.name}</span>
                  <span style={{ color: 'var(--secondary-text-color)' }}>{index.value}</span>
                  <span style={{ fontWeight: 'bold', color: index.color === '#4caf50' ? 'var(--positive-change-color)' : 'var(--negative-change-color)' }}>{index.change}</span>
                </div>
              ))}
              <div style={{ fontSize: 13, color: 'var(--secondary-text-color)', marginTop: 15, textAlign: 'center' }}>
                Real-time market data insights.
              </div>
            </div>

            {/* Portfolio News */}
            <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 20, flexGrow: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: 18, color: 'var(--primary-color)', marginBottom: 15 }}>Portfolio News</div>
              {mockPortfolioNews.map((news, idx) => (
                <div key={idx} style={{ fontSize: 14, marginBottom: 10, borderBottom: '1px dashed var(--border-color)', paddingBottom: 8 }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-color)' }}>{news.headline}</span>
                  <span style={{ fontSize: 12, color: 'var(--secondary-text-color)', marginLeft: 8 }}>({news.date})</span>
                </div>
              ))}
              <div style={{ fontSize: 13, color: 'var(--secondary-text-color)', marginTop: 15, textAlign: 'center' }}>
                Stay updated with news relevant to your portfolio.
              </div>
            </div>
          </div>
        </div>

        {/* 持仓列表 */}
        <div style={{ marginBottom: 16, fontWeight: 'bold', color: 'var(--primary-color)', fontSize: 18, marginTop: 24 }}>Your Holdings</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mockPortfolio.positions.map(pos => (
            <div
              key={pos.symbol}
              style={{
                background: 'var(--card-bg)',
                borderRadius: 16,
                boxShadow: '0 2px 8px var(--shadow-color-light)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                cursor: pos.symbol === 'AAPL' ? 'pointer' : 'default',
                transition: 'box-shadow 0.2s',
              }}
              onClick={pos.symbol === 'AAPL' ? onGoAppleDetail : undefined}
            >
              <img
                src={pos.logo}
                alt={pos.symbol}
                style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-color)', objectFit: 'contain', marginRight: 12 }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: 16 }}>{pos.name}</div>
                <div style={{ color: 'var(--secondary-text-color)', fontSize: 14 }}>{pos.symbol}</div>
                {/* 这里添加迷你趋势图和月/日变化 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <img src={pos.chart} alt="trend" style={{ width: 60, height: 28, objectFit: 'contain', background: 'var(--bg-color)', borderRadius: 6 }} />
                  <div style={{ fontSize: 13, color: 'var(--secondary-text-color)' }}>
                    30d: <span style={{ color: pos.monthChange.startsWith('+') ? 'var(--positive-change-color)' : 'var(--negative-change-color)', fontWeight: 'bold' }}>{pos.monthChange}</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--secondary-text-color)' }}>
                    1d: <span style={{ color: pos.dayChange.startsWith('+') ? 'var(--positive-change-color)' : 'var(--negative-change-color)', fontWeight: 'bold' }}>{pos.dayChange}</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 120 }}>
                <div style={{ fontWeight: 'bold', fontSize: 16, color: 'var(--text-color)' }}>{pos.value}</div>
                <div style={{ color: pos.profitColor === '#4caf50' ? 'var(--positive-change-color)' : 'var(--negative-change-color)', fontSize: 14 }}>{pos.profit}</div>
                <div style={{ fontSize: 12, color: 'var(--secondary-text-color)', marginTop: 4 }}>{pos.shares} shares</div>
              </div>
              {/* 小型趋势折线图 */}
              <svg width="60" height="32" viewBox="0 0 60 32" style={{ marginLeft: 12 }}>
                <polyline
                  fill="none"
                  stroke={pos.profitColor === '#4caf50' ? 'var(--positive-change-color)' : 'var(--negative-change-color)'}
                  strokeWidth="2"
                  points={pos.trend}
                  opacity="0.8"
                />
                {(() => {
                  const lastPoint = pos.trend.split(' ').pop().split(',');
                  return <circle cx={lastPoint[0]} cy={lastPoint[1]} r="2" fill={pos.profitColor === '#4caf50' ? 'var(--positive-change-color)' : 'var(--negative-change-color)'} />;
                })()}
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage; 