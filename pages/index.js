import Head from 'next/head';
import { useState, useEffect } from 'react';
import { translations } from '../locales/translations';

export default function IntuitiveLandingPage() {
  const [lang, setLang] = useState('en'); 
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 价格与汇率状态
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [hourlyPrice, setHourlyPrice] = useState('0.75');

  // 1. 页面加载时检测浏览器语言，并通过 IP 自动获取地区与汇率（失败则严格兜底为 USD）
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

    // 异步通过 IP 获取用户真实地理位置与全球本地货币
    async function detectIpAndFetchRates() {
      let targetCurrency = 'USD';
      let symbol = '$';

      try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        
        if (ipData && ipData.currency) {
          targetCurrency = ipData.currency.toUpperCase();
        }

        const symbolMap = {
          USD: '$', CAD: '$', EUR: '€', GBP: '£', JPY: '¥', 
          AUD: '$', NZD: '$', SGD: '$', HKD: '$', CNY: '¥', 
          CHF: 'CHF', INR: '₹', TWD: 'NT$'
        };
        
        symbol = symbolMap[targetCurrency] || '$';
      } catch (e) {
        // 定位异常时，强制兜底为 USD
        targetCurrency = 'USD';
        symbol = '$';
      }

      setCurrencySymbol(symbol);
      setCurrencyCode(targetCurrency);

      // 请求实时汇率 API（以 CAD 为基础进行换算）
      try {
        const rateRes = await fetch('https://open.er-api.com/v6/latest/CAD');
        const rateData = await rateRes.json();
        
        if (rateData && rateData.rates && rateData.rates[targetCurrency]) {
          const rate = rateData.rates[targetCurrency];
          const calculatedHourly = (1 * rate).toFixed(2);
          setHourlyPrice(calculatedHourly);
        } else {
          // 未收录的冷门币种安全兜底为 USD
          setCurrencyCode('USD');
          setCurrencySymbol('$');
          const fallbackRate = rateData?.rates?.['USD'] || 0.75;
          setHourlyPrice((1 * fallbackRate).toFixed(2));
        }
      } catch (e) {
        // 汇率接口异常时安全兜底为 USD
        setCurrencyCode('USD');
        setCurrencySymbol('$');
        setHourlyPrice('0.75');
      }
    }

    detectIpAndFetchRates();
  }, []);

  const currentText = translations[lang] || translations.en;
  const captionLines = currentText.captionLines || [];

  // 2. 根据 translations 中的配置动态渲染本地化每小时价格格式、币种称呼与小时单位
  const getLocalizedPriceText = () => {
    let priceVal = hourlyPrice;
    if (['fr', 'de', 'es', 'it', 'pt', 'ru'].includes(lang)) {
      priceVal = hourlyPrice.replace('.', ',');
    }

    const currencyMap = currentText.currencies || {};
    const localCurrencyName = currencyMap[currencyCode] || currencyCode;
    const formatTemplate = currentText.priceFormat || "{symbol}{price} {currency} / {unit}";
    const unitText = currentText.perHourText || "hr";

    return formatTemplate
      .replace('{symbol}', currencySymbol)
      .replace('{price}', priceVal)
      .replace('{currency}', localCurrencyName)
      .replace('{unit}', unitText);
  };

  // 3. 字幕自动轮播定时器
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
        padding: '16px 20px',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}>
        {/* 顶部导航栏 */}
        <nav style={{ width: '100%', maxWidth: '850px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></span>
            <span style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#ffffff' }}>Deer AI</span>
          </div>
          <a 
            href="https://live-caption.deerai.ca" 
            style={{ padding: '7px 16px', background: '#2563eb', color: 'white', borderRadius: '9px', textDecoration: 'none', fontWeight: '700', fontSize: '0.82rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
          >
            {currentText.navBtn}
          </a>
        </nav>

        {/* 核心内容区（控制在单屏高度内） */}
        <div style={{ maxWidth: '720px', width: '100%', textAlign: 'center', margin: '15px 0' }}>
          
          {/* 主标题 */}
          <h1 style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', fontWeight: '900', lineHeight: '1.12', letterSpacing: '-0.035em', color: '#ffffff', marginBottom: '12px' }}>
            {currentText.heroLine1} <br />
            <span style={{ background: 'linear-gradient(135deg, #34d399 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {currentText.heroLine2}
            </span>
          </h1>

          {/* 极简单行价格胶囊（自动根据 IP 切换币种、按语言匹配本地化名称与小时单位） */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(17, 24, 39, 0.8)',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            padding: '6px 16px',
            borderRadius: '30px',
            fontSize: '0.9rem',
            marginBottom: '14px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            <span style={{ color: '#34d399', fontWeight: '800' }}>{getLocalizedPriceText()}*</span>
          </div>

          {/* 直播字幕动态演示视窗 */}
          <div style={{ 
            background: 'linear-gradient(180deg, #111827 0%, #0b1120 100%)', 
            border: '1px solid rgba(16, 185, 129, 0.25)', 
            borderRadius: '16px', 
            padding: '16px', 
            marginBottom: '14px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ef4444', fontWeight: '700' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 6px #ef4444' }}></span> {currentText.liveBadge}
              </span>
            </div>

            <div style={{ 
              background: 'rgba(0, 0, 0, 0.85)', 
              border: '1px solid rgba(255, 255, 255, 0.08)', 
              borderRadius: '10px', 
              padding: '30px 14px 14px 14px', 
              minHeight: '80px',
              display: 'flex',
              alignItems: 'flex-end', 
              justifyContent: 'center',
              textAlign: 'center',
              overflow: 'hidden'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: 'clamp(0.75rem, 2vw, 1.35rem)', 
                fontWeight: '600', 
                color: '#ffffff', 
                textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                lineHeight: '1.3',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                transition: 'opacity 0.3s ease-in-out'
              }}>
                {captionLines.length > 0 ? captionLines[currentIndex] : "Loading live preview..."}
              </p>
            </div>
            
            <p style={{ margin: '10px 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
              {currentText.captionHint}
            </p>
          </div>

          {/* 底部行动主按键 */}
          <a 
            href="https://live-caption.deerai.ca" 
            style={{ display: 'block', width: '100%', padding: '14px', background: '#10b981', color: '#030712', borderRadius: '12px', textDecoration: 'none', fontWeight: '800', fontSize: '1rem', boxSizing: 'border-box', boxShadow: '0 6px 20px rgba(16,185,129,0.3)', transition: 'transform 0.2s', marginBottom: '8px' }}
          >
            {currentText.mainBtn || "Start Free / Get Started"}
          </a>

          {/* 价格免责小字说明 */}
          <p style={{ fontSize: '0.7rem', color: '#6b7280', margin: 0 }}>
            * Prices are subject to change based on real-time exchange rates. Final amount is determined at checkout.
          </p>
        </div>

        {/* 极简页脚 */}
        <footer style={{ width: '100%', maxWidth: '850px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#6b7280', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
          <span>© {new Date().getFullYear()} Deer AI (deerai.ca)</span>
          <div style={{ display: 'flex', gap: '14px' }}>
            <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none' }}>{currentText.privacy}</a>
            <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none' }}>{currentText.terms}</a>
          </div>
        </footer>
      </main>
    </>
  );
}
