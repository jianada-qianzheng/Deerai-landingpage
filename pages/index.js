import Head from 'next/head';
import { useState, useEffect } from 'react';
import { translations } from '../locales/translations';

export default function IntuitiveLandingPage() {
  const [lang, setLang] = useState('en'); // 默认初始状态为英文
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. 页面加载时精准检测浏览器语言（支持繁体中文、简体中文及其他9种语言）
  useEffect(() => {
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();

    let targetLang = 'en'; // 默认回退英文

    if (browserLang.includes('zh-tw') || browserLang.includes('zh-hk') || browserLang.includes('zh-hant')) {
      targetLang = 'zh-TW'; // 台湾/香港繁体中文
    } else if (browserLang.includes('zh')) {
      targetLang = 'zh'; // 简体中文
    } else {
      const shortLang = browserLang.split('-')[0];
      const supportedLangs = ['fr', 'es', 'de', 'ja', 'ko', 'pt', 'it', 'ru'];
      if (supportedLangs.includes(shortLang)) {
        targetLang = shortLang;
      }
    }

    setLang(targetLang);
  }, []);

  // 获取当前对应的文案字典
  const currentText = translations[lang] || translations.en;
  const captionLines = currentText.captionLines;

  // 2. 字幕自动轮播定时器
  useEffect(() => {
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
        <div style={{ maxWidth: '780px', width: '100%', textAlign: 'center', margin: 'auto 0', padding: '20px 0' }}>
          
          <h1 style={{ fontSize: 'clamp(1.7rem, 5.2vw, 3.4rem)', fontWeight: '900', lineHeight: '1.15', letterSpacing: '-0.035em', color: '#ffffff', marginBottom: '32px' }}>
            {currentText.heroLine1} <br />
            <span style={{ background: 'linear-gradient(135deg, #34d399 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {currentText.heroLine2}
            </span>
          </h1>

          {/* 🌟 直播字幕动态演示视窗 */}
          <div style={{ 
            background: 'linear-gradient(180deg, #111827 0%, #0b1120 100%)', 
            border: '1px solid rgba(16, 185, 129, 0.3)', 
            borderRadius: '20px', 
            padding: '24px', 
            marginBottom: '28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* 视窗顶部状态栏 */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '16px', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: '700' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 8px #ef4444' }}></span> {currentText.liveBadge}
              </span>
            </div>

            {/* 字幕黑底框模拟 */}
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
                {captionLines[currentIndex]}
              </p>
            </div>
            
            <p style={{ margin: '14px 0 0 0', fontSize: '0.8rem', color: '#6b7280' }}>
              {currentText.captionHint}
            </p>
          </div>

          {/* 行动按钮 */}
          <a 
            href="https://live-caption.deerai.ca" 
            style={{ display: 'block', width: '100%', padding: '16px', background: '#10b981', color: '#030712', borderRadius: '14px', textDecoration: 'none', fontWeight: '800', fontSize: '1.05rem', boxSizing: 'border-box', boxShadow: '0 6px 25px rgba(16,185,129,0.35)', transition: 'transform 0.2s' }}
          >
            {currentText.mainBtn}
          </a>
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
