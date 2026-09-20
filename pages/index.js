import Head from 'next/head';
import { useState, useEffect } from 'react';
import { translations } from '../locales/translations';

export default function IntuitiveLandingPage() {
  const [lang, setLang] = useState('en'); 
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 价格与汇率状态
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [currencyCode, setCurrencyCode] = useState('CAD');
  const [packagePrice, setPackagePrice] = useState('10.00');
  const [hourlyPrice, setHourlyPrice] = useState('1.00');

  // 1. 页面加载时检测语言、地区并请求汇率 API
  useEffect(() => {
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

    let targetLang = 'en'; 
    if (browserLang.includes('zh-tw') || browserLang.includes('zh-hk') || browserLang.includes('zh-hant')) {
      targetLang = 'zh-TW'; 
    } else if (browserLang.includes('zh')) {
      targetLang = 'zh'; 
    } else {
      const shortLang = browserLang.split('-')[0];
      const supportedLangs = ['fr', 'es', 'de', 'ja', 'ko', 'pt', 'it', 'ru'];
      if (supportedLangs.includes(shortLang)) {
        targetLang = shortLang;
      }
    }
    setLang(targetLang);

    // 确定目标币种
    let targetCurrency = 'CAD';
    let symbol = '$';
    if (browserLang.includes('ca')) {
      targetCurrency = 'CAD';
      symbol = '$';
    } else if (browserLang.includes('fr') || browserLang.includes('de') || browserLang.includes('es') || browserLang.includes('it') || browserLang.includes('eu')) {
      targetCurrency = 'EUR';
      symbol = '€';
    } else {
      targetCurrency = 'USD';
      symbol = '$';
    }

    setCurrencySymbol(symbol);
    setCurrencyCode(targetCurrency);

    // 异步请求免费汇率 API（以 CAD 为基础货币）
    async function fetchExchangeRates() {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/CAD');
        const data = await res.json();
        
        if (data && data.rates && data.rates[targetCurrency]) {
          const rate = data.rates[targetCurrency];
          // 基础价 10 CAD，600分钟（10小时），即每小时 1 CAD
          const calculatedPackage = (10 * rate).toFixed(2);
          const calculatedHourly = (1 * rate).toFixed(2);
          
          setPackagePrice(calculatedPackage);
          setHourlyPrice(calculatedHourly);
        }
      } catch (e) {
        // API 异常时使用默认兜底价
        if (targetCurrency === 'USD') {
          setPackagePrice('7.50');
          setHourlyPrice('0.75');
        } else if (targetCurrency === 'EUR') {
          setPackagePrice('7.00');
          setHourlyPrice('0.70');
        } else {
          setPackagePrice('10.00');
          setHourlyPrice('1.00');
        }
      }
    }

    fetchExchangeRates();
  }, []);

  const currentText = translations[lang] || translations.en;
  const captionLines = currentText.captionLines || [];

  // 2. 字幕自动轮播定时器
  useEffect(() => {
    if (captionLines.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % captionLines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [captionLines.length]);

  return (
    <>
      <Head>
        <title>{currentText.title}</title>
        <meta name="description" content={currentText.description} />
      </Head>

      <main style={{
        minHeight: '100vh',
        background: '#070b14',
        color: '#f3f4f6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '30px 20px',
        boxSizing: 'border-box'
      }}>
        {/* 顶部导航栏 */}
        <nav style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981' }}></span>
            <span style={{ fontWeight: '800', fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#ffffff' }}>Deer AI</span>
          </div>
          <a 
            href="https://live-caption.deerai.ca" 
            style={{ padding: '8px 18px', background: '#2563eb', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
          >
            {currentText.navBtn}
          </a>
        </nav>

        {/* 核心价值区 */}
        <div style={{ maxWidth: '780px', width: '100%', textAlign: 'center', margin: '40px 0', padding: '10px 0' }}>
          
          <h1 style={{ fontSize: 'clamp(1.7rem, 5.2vw, 3.4rem)', fontWeight: '900', lineHeight: '1.15', letterSpacing: '-0.035em', color: '#ffffff', marginBottom: '24px' }}>
            {currentText.heroLine1} <br />
            <span style={{ background: 'linear-gradient(135deg, #34d399 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {currentText.heroLine2}
            </span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#9ca3af', marginBottom: '32px', lineHeight: '1.5' }}>
            {currentText.heroDesc || "Real-time AI live transcription for OBS and YouTube streams. High accuracy, ultra-low latency."}
          </p>

          {/* 🌟 直播字幕动态演示视窗 */}
          <div style={{ 
            background: 'linear-gradient(180deg, #111827 0%, #0b1120 100%)', 
            border: '1px solid rgba(16, 185, 129, 0.3)', 
            borderRadius: '20px', 
            padding: '24px', 
            marginBottom: '36px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '16px', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: '700' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 8px #ef4444' }}></span> {currentText.liveBadge}
              </span>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.85)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              borderRadius: '12px', 
              padding: '45px 16px 20px 16px', 
              minHeight: '100px',
              display: 'flex',
              alignItems: 'flex-end', 
              justifyContent: 'center',
              textAlign: 'center',
              overflow: 'hidden'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: 'clamp(0.75rem, 2.2vw, 1.5rem)', 
                fontWeight: '600', 
                color: '#ffffff', 
                textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                lineHeight: '1.4',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                transition: 'opacity 0.3s ease-in-out'
              }}>
                {captionLines.length > 0 ? captionLines[currentIndex] : "Loading live preview..."}
              </p>
            </div>
            
            <p style={{ margin: '14px 0 0 0', fontSize: '0.8rem', color: '#6b7280' }}>
              {currentText.captionHint}
            </p>
          </div>

          {/* 🌟 价格展示板块（支持动态汇率换算与每小时单价） */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.6) 100%)',
            border: '1px solid rgba(52, 211, 153, 0.4)',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '4px 12px', borderRadius: '20px' }}>
              Transparent Pricing
            </span>
            
            {/* 每小时单价突出展示 */}
            <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#ffffff', margin: '16px 0 4px 0' }}>
              {currencySymbol}{hourlyPrice} <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#34d399' }}>{currencyCode} / hour</span>
            </div>
            
            {/* 套餐总量说明 */}
            <p style={{ fontSize: '0.95rem', color: '#9ca3af', marginBottom: '20px' }}>
              Or <strong style={{ color: '#ffffff' }}>{currencySymbol}{packagePrice} {currencyCode}</strong> for 600 minutes (10 hours) • Never expires
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#d1d5db' }}>
              <li>✓ Support OBS Studio & YouTube Live CC</li>
              <li>✓ High-accuracy Nova-3 AI model</li>
              <li>✓ Multi-language real-time translation</li>
            </ul>
            <a 
              href="https://live-caption.deerai.ca" 
              style={{ display: 'block', width: '100%', padding: '16px', background: '#10b981', color: '#030712', borderRadius: '14px', textDecoration: 'none', fontWeight: '800', fontSize: '1.05rem', boxSizing: 'border-box', boxShadow: '0 6px 25px rgba(16,185,129,0.35)', transition: 'transform 0.2s' }}
            >
              {currentText.mainBtn || "Get Started Now"}
            </a>
          </div>

        </div>

        {/* 极简页脚 */}
        <footer style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
          <span>© {new Date().getFullYear()} Deer AI (deerai.ca)</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none' }}>{currentText.privacy}</a>
            <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none' }}>{currentText.terms}</a>
          </div>
        </footer>
      </main>
    </>
  );
}
