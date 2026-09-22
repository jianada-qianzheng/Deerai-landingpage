import Head from 'next/head';
import { useState, useEffect } from 'react';
import { translations } from '../locales/translations';

export default function IntuitiveLandingPage() {
  const [lang, setLang] = useState('en'); 
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 價格與彙率狀態
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [hourlyPrice, setHourlyPrice] = useState('0.75');

  // 1. 頁面載入時檢測語言，並通過 IP 自動獲取地區與彙率（失敗則嚴格兜底爲 USD）
  useEffect(() => {
    // 🌟 優先讀取 URL 參數（例如 ?lang=ja），方便您開發和隨時測試所有語言！
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get('lang');

    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    let targetLang = 'en'; 

    if (queryLang && translations[queryLang]) {
      targetLang = queryLang; 
    } else if (browserLang.includes('zh-tw') || browserLang.includes('zh-hk') || browserLang.includes('zh-hant')) {
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

    // 異步通過 IP 獲取用戶真實地理位置與全球本地貨幣
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
        // 定位異常時，強制兜底爲 USD
        targetCurrency = 'USD';
        symbol = '$';
      }

      setCurrencySymbol(symbol);
      setCurrencyCode(targetCurrency);

      // 請求實時彙率 API（以 CAD 爲基礎進行換算）
      try {
        const rateRes = await fetch('https://open.er-api.com/v6/latest/CAD');
        const rateData = await rateRes.json();
        
        if (rateData && rateData.rates && rateData.rates[targetCurrency]) {
          const rate = rateData.rates[targetCurrency];
          const calculatedHourly = (1 * rate).toFixed(2);
          setHourlyPrice(calculatedHourly);
        } else {
          // 未收錄的冷門幣種安全兜底爲 USD
          setCurrencyCode('USD');
          setCurrencySymbol('$');
          const fallbackRate = rateData?.rates?.['USD'] || 0.75;
          setHourlyPrice((1 * fallbackRate).toFixed(2));
        }
      } catch (e) {
        // 彙率接口異常時安全兜底爲 USD
        setCurrencyCode('USD');
        setCurrencySymbol('$');
        setHourlyPrice('0.75');
      }
    }

    detectIpAndFetchRates();
  }, []);

  const currentText = translations[lang] || translations.en;
  const captionLines = currentText.captionLines || [];

  // 2. 根據 translations 動態渲染本地化價格格式、幣種和單位
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

  // 3. 字幕自動輪播定時器
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
        background: '#ffffff',
        color: '#111827',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}>
        {/* 頂部導航欄 */}
        <nav style={{ width: '100%', maxWidth: '850px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/IMG_1048.png" alt="Deer AI Logo" style={{ height: '32px', width: 'auto', display: 'block' }} />
            <span style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#111827' }}>Deer AI</span>
          </div>
          <a 
            href="https://live-caption.deerai.ca" 
            style={{ padding: '7px 16px', background: '#2563eb', color: 'white', borderRadius: '9px', textDecoration: 'none', fontWeight: '700', fontSize: '0.82rem', boxShadow: '0 4px 12px rgba(37,99,235,0.2)' }}
          >
            {currentText.navBtn}
          </a>
        </nav>

        {/* 核心內容區（控制在單屏高度內） */}
        <div style={{ maxWidth: '720px', width: '100%', textAlign: 'center', margin: '15px 0' }}>
          
          {/* 主標題 */}
          <h1 style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.8rem)', fontWeight: '900', lineHeight: '1.12', letterSpacing: '-0.035em', color: '#111827', marginBottom: '12px' }}>
            {currentText.heroLine1} <br />
            <span style={{ background: 'linear-gradient(135deg, #059669 0%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {currentText.heroLine2}
            </span>
          </h1>

          {/* 極簡單行價格膠囊 */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#f8fafc',
            border: '1px solid rgba(5, 150, 105, 0.25)',
            padding: '6px 16px',
            borderRadius: '30px',
            fontSize: '0.9rem',
            marginBottom: '14px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
          }}>
            <span style={{ color: '#059669', fontWeight: '800' }}>{getLocalizedPriceText()}*</span>
          </div>

          {/* 直播字幕動態演示視窗 */}
          <div style={{ 
            background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)', 
            border: '1px solid rgba(5, 150, 105, 0.2)', 
            borderRadius: '16px', 
            padding: '16px', 
            marginBottom: '14px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px', fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ef4444', fontWeight: '700' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 6px #ef4444' }}></span> {currentText.liveBadge}
              </span>
            </div>

            <div style={{ 
              background: '#0b1120', 
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

          {/* 底部行動主按鍵 */}
          <a 
            href="https://live-caption.deerai.ca" 
            style={{ display: 'block', width: '100%', padding: '14px', background: '#059669', color: '#ffffff', borderRadius: '12px', textDecoration: 'none', fontWeight: '800', fontSize: '1rem', boxSizing: 'border-box', boxShadow: '0 6px 20px rgba(5,150,105,0.25)', transition: 'transform 0.2s', marginBottom: '8px' }}
          >
            {currentText.mainBtn || "Start Free / Get Started"}
          </a>

          {/* 🌟 價格免責小字說明（從 translation 讀取） */}
          <p style={{ fontSize: '0.7rem', color: '#6b7280', margin: 0 }}>
            {currentText.disclaimer}
          </p>
        </div>

        {/* 極簡頁腳 */}
        <footer style={{ width: '100%', maxWidth: '850px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#6b7280', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px' }}>
          <span>© {new Date().getFullYear()} Deer AI (deerai.ca)</span>
          <div style={{ display: 'flex', gap: '14px' }}>
            <a href="/privacy" style={{ color: '#4b5563', textDecoration: 'none' }}>{currentText.privacy}</a>
            <a href="/terms" style={{ color: '#4b5563', textDecoration: 'none' }}>{currentText.terms}</a>
          </div>
        </footer>
      </main>
    </>
  );
}
