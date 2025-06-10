import React, { useState, useContext } from 'react';
import Header from './Header';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid, Bar } from 'recharts';
import { ThemeContext } from '../contexts/ThemeContext';

// 模拟不同区间的数据
const mockPriceData = {
  '1D': [
    { date: '09:30', price: 43.1, volume: 1200 }, { date: '10:30', price: 43.3, volume: 1800 }, { date: '11:30', price: 43.0, volume: 900 }, { date: '12:30', price: 43.2, volume: 1500 }, { date: '13:30', price: 43.4, volume: 2100 }, { date: '14:30', price: 43.21, volume: 1700 }
  ],
  '1W': [
    { date: 'Mon', price: 42.8, volume: 8000 }, { date: 'Tue', price: 43.0, volume: 9500 }, { date: 'Wed', price: 43.5, volume: 12000 }, { date: 'Thu', price: 43.2, volume: 11000 }, { date: 'Fri', price: 43.21, volume: 9000 }
  ],
  '1M': [
    { date: 'Sep 1', price: 41.2, volume: 30000 }, { date: 'Sep 7', price: 42.0, volume: 35000 }, { date: 'Sep 14', price: 43.0, volume: 40000 }, { date: 'Sep 21', price: 44.04, volume: 42000 }, { date: 'Sep 27', price: 44.04, volume: 39000 }, { date: 'Sep 30', price: 43.21, volume: 37000 }
  ],
  '1Y': [
    { date: '2023-01', price: 32, volume: 120000 }, { date: '2023-04', price: 36, volume: 140000 }, { date: '2023-07', price: 39, volume: 160000 }, { date: '2023-10', price: 41, volume: 170000 }, { date: '2024-01', price: 43, volume: 180000 }, { date: '2024-04', price: 43.21, volume: 175000 }
  ],
  'ALL': [
    { date: '2019', price: 18, volume: 80000 }, { date: '2020', price: 25, volume: 100000 }, { date: '2021', price: 32, volume: 120000 }, { date: '2022', price: 38, volume: 130000 }, { date: '2023', price: 41, volume: 140000 }, { date: '2024', price: 43.21, volume: 135000 }
  ]
};

const timeRanges = ['1D', '1W', '1M', '1Y', 'ALL'];

function AppleDetailPage({ onGoBack, onGoBuyStock }) {
  const [range, setRange] = useState('1M');
  const [tab, setTab] = useState('summary');
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const [stockData, setStockData] = useState(null); // 移除API相关状态
  // const [loading, setLoading] = useState(true); // 移除API相关状态

  // 移除 useEffect 中的 API 调用逻辑
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `http://api.marketstack.com/v1/eod/latest?access_key=${API_KEY}&symbols=${SYMBOL}`;
        const response = await axios.get(url);
        if (response.data && response.data.data && response.data.data.length > 0) {
          const fetchedData = response.data.data[0];
          setStockData(fetchedData);
          console.log('AppleDetailPage 获取到的股票数据:', fetchedData);

        } else {
          console.warn('未获取到AAPL股票数据');
        }
      } catch (error) {
        console.error('获取AAPL股票数据失败:', error);
        const lastMockDataPoint = mockPriceData[range][mockPriceData[range].length - 1];
        setStockData({ close: lastMockDataPoint.price, volume: lastMockDataPoint.volume, change: 0, change_percent: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);
  */

  // 始终根据模拟数据计算当前显示数据
  const data = mockPriceData[range];
  const current = data[data.length - 1];
  const prev = data[0];

  // 始终根据模拟数据计算涨跌幅
  const diff = (current.price - prev.price).toFixed(2);
  const diffPercent = ((current.price - prev.price) / prev.price * 100).toFixed(2);
  const up = diff > 0;

  // 准备传递给购买页的模拟股票信息
  const mockStockInfoForBuyPage = {
    close: current.price, // 使用当前模拟价格作为股票的收盘价
    symbol: 'AAPL',
    name: 'Apple Inc.',
    logo: '/images/apple.png',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
      <Header />
      <div style={{ maxWidth: 420, margin: '0 auto', padding: '0 12px', position: 'relative' }}>
        {/* 顶部返回和标题 */}
        <button
          onClick={onGoBack}
          style={{ margin: '20px 0 8px 0', background: 'none', border: 'none', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: 16, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
        >
          ← Back
        </button>
        <div style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 8, color: 'var(--text-color)' }}>Detail Stock</div>
        {/* 股票卡片 */}
        <div style={{ background: 'var(--card-bg)', borderRadius: 16, boxShadow: '0 2px 8px var(--shadow-color-light)', padding: 16, display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <img src="/images/apple.png" alt="AAPL" style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--bg-color)', objectFit: 'contain', marginRight: 14 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', fontSize: 16, color: 'var(--text-color)' }}>AAPL</div>
            <div style={{ color: 'var(--secondary-text-color)', fontSize: 14 }}>Apple Inc.</div>
          </div>
          <span style={{ fontSize: 22, color: 'var(--secondary-text-color)', marginLeft: 8, cursor: 'pointer' }}>🔔</span>
        </div>
        {/* 当前价格和涨跌幅 */}
        {
          // 移除加载判断，直接显示模拟数据
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: 'var(--text-color)' }}>${current.price.toFixed(2)}</div>
              <div style={{ fontSize: 14, color: up ? 'var(--positive-change-color)' : 'var(--negative-change-color)', fontWeight: 'bold' }}>
                {up ? '+' : ''}{diff} ({up ? '+' : ''}{diffPercent}%) Past Month
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 'bold', color: 'var(--primary-color)' }}>${current.price.toFixed(2)}</div>
              <div style={{ fontSize: 14, color: up ? 'var(--positive-change-color)' : 'var(--negative-change-color)' }}>
                {up ? '+' : ''}{diff} ({up ? '+' : ''}{diffPercent}%) 
              </div>
            </div>
          </div>
        }
        {/* 折线图+成交量柱状图 */}
        <div style={{ width: '100%', height: 220, margin: '12px 0 0 0', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 16, right: 32, left: 0, bottom: 24 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--secondary-text-color)' }} axisLine={{ stroke: 'var(--border-color)' }} tickLine={false} interval="preserveEnd" />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: 'var(--primary-color)' }}
                axisLine={false}
                tickLine={false}
                width={48}
                tickFormatter={v => `$${v}`}
                domain={[d => Math.floor(Math.min(...data.map(i => i.price)) * 0.98), d => Math.ceil(Math.max(...data.map(i => i.price)) * 1.02)]}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                hide
                domain={[0, d => Math.max(...data.map(i => i.volume)) * 1.2]}
              />
              {/* 多条虚线参考线 */}
              <ReferenceLine y={current.price} yAxisId="right" stroke="var(--primary-color)" strokeDasharray="4 2" />
              <ReferenceLine y={prev.price} yAxisId="right" stroke="var(--secondary-text-color)" strokeDasharray="2 2" />
              {/* 成交量柱状图 */}
              <Bar yAxisId="left" dataKey="volume" barSize={14} fill="var(--border-color)" radius={[4, 4, 0, 0]} />
              {/* 价格折线 */}
              <Line yAxisId="right" type="monotone" dataKey="price" stroke="var(--primary-color)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: 'var(--card-bg)', stroke: 'var(--primary-color)', strokeWidth: 3 }} animationDuration={800} />
              {/* Tooltip美化，显示价格和成交量 */}
              <Tooltip
                contentStyle={{ borderRadius: 12, fontSize: 13, background: 'var(--card-bg)', color: 'var(--text-color)', border: '1px solid var(--border-color)', boxShadow: '0 2px 12px var(--shadow-color-dark)' }}
                labelStyle={{ color: 'var(--text-color)', fontWeight: 'bold' }}
                formatter={(v, n) => n === 'price' ? `$${v}` : n === 'volume' ? `${v} vol` : v}
                labelFormatter={l => <span style={{ color: 'var(--text-color)' }}>{l}</span>}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* 时间区间切换 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0 0 0', padding: '0 8px' }}>
          {timeRanges.map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                background: range === r ? 'var(--primary-color)' : 'none',
                color: range === r ? 'white' : 'var(--secondary-text-color)',
                border: 'none',
                borderRadius: 8,
                fontWeight: 'bold',
                fontSize: 14,
                padding: '4px 14px',
                cursor: 'pointer',
                marginRight: 2
              }}
            >
              {r}
            </button>
          ))}
        </div>
        {/* Tab切换 */}
        <div style={{ display: 'flex', background: 'var(--bg-color)', borderRadius: 12, margin: '18px 0 0 0', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <button
            style={{ flex: 1, padding: '10px 0', background: tab === 'summary' ? 'var(--card-bg)' : 'none', border: 'none', fontWeight: 'bold', color: tab === 'summary' ? 'var(--primary-color)' : 'var(--secondary-text-color)', fontSize: 15, borderRadius: 12, boxShadow: tab === 'summary' ? '0 1px 4px var(--shadow-color-light)' : 'none', transition: 'all 0.2s' }}
            onClick={() => setTab('summary')}
          >Summary</button>
          <button
            style={{ flex: 1, padding: '10px 0', background: tab === 'details' ? 'var(--card-bg)' : 'none', border: 'none', fontWeight: 'bold', color: tab === 'details' ? 'var(--primary-color)' : 'var(--secondary-text-color)', fontSize: 15, borderRadius: 12, boxShadow: tab === 'details' ? '0 1px 4px var(--shadow-color-light)' : 'none', transition: 'all 0.2s' }}
            onClick={() => setTab('details')}
          >Details</button>
        </div>
        {/* Tab内容区 */}
        {tab === 'summary' && (
          <div style={{ background: 'var(--card-bg)', borderRadius: 12, padding: 16, margin: '10px 0 0 0', color: 'var(--text-color)', fontSize: 15, boxShadow: '0 2px 8px var(--shadow-color-light)' }}>
            <div><b>Apple Inc.</b> is a leading technology company known for iPhone, iPad, Mac, and more. The chart above shows the recent price and volume trend for AAPL stock.</div>
            <div style={{ marginTop: 8 }}>Current Price: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${current.price.toFixed(2)}</span></div>
            <div>Change (from start): <span style={{ color: up ? 'var(--positive-change-color)' : 'var(--negative-change-color)', fontWeight: 'bold' }}>{up ? '+' : ''}{diff} ({up ? '+' : ''}{diffPercent}%)</span></div>
          </div>
        )}
        {tab === 'details' && (
          <div style={{ background: 'var(--card-bg)', borderRadius: 12, padding: 16, margin: '10px 0 0 0', color: 'var(--text-color)', fontSize: 15, boxShadow: '0 2px 8px var(--shadow-color-light)' }}>
            <div>Market Cap: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>$2.8T</span></div>
            <div>PE Ratio: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>28.5</span></div>
            <div>Dividend Yield: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>0.6%</span></div>
            <div>EPS: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>$6.05</span></div>
            <div>Beta: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>1.25</span></div>
            <div>52W High: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>$198.23</span></div>
            <div>52W Low: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>$124.17</span></div>
          </div>
        )}
        {/* Financials 区块 */}
        <div style={{ margin: '18px 0 0 0', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: 16 }}>Financials</div>
        <div style={{ background: 'var(--card-bg)', borderRadius: 12, padding: 16, margin: '8px 0 0 0', color: 'var(--text-color)', fontSize: 15, boxShadow: '0 2px 8px var(--shadow-color-light)' }}>
          <div>Market Cap: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>$2.8T</span></div>
          <div>PE Ratio: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>28.5</span></div>
          <div>Dividend Yield: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>0.6%</span></div>
        </div>
        {/* Buy stocks 按钮 */}
        <button style={{ width: '100%', background: 'var(--primary-color)', color: 'white', fontWeight: 'bold', fontSize: 18, border: 'none', borderRadius: 12, padding: '14px 0', margin: '24px 0 16px 0', boxShadow: '0 2px 8px var(--shadow-color-dark)' }}
          onClick={() => onGoBuyStock(mockStockInfoForBuyPage)}
        >
          Buy stocks
        </button>
      </div>
    </div>
  );
}

export default AppleDetailPage; 