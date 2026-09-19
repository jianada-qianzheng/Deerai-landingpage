import Head from 'next/head';
import { useState, useEffect } from 'react';

// 直播字幕语句（包含核心说明，整行切换）
const captionLines = [
  "Speak naturally during your broadcast. Our AI instantly converts your voice into professional live captions on screen with zero lag.",
  "Seamlessly integrated with OBS Studio and YouTube Live.",
  "Zero latency. Professional broadcasting quality."
];

export default function IntuitiveLandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 每一行字幕停留 3.5 秒后自动切换下一行（整行刷新）
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % captionLines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>deer ai - Real-Time Subtitles for Live Streaming</title>
        <meta name="description" content="Professional AI-powered real-time live captions for OBS Studio and YouTube streams." />
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
            <span style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.025em', color: '#ffffff' }}>deer ai</span>
          </div>
          <a 
            href="https://你的主应用链接" 
            style={{ padding: '8px 18px', background: '#2563eb', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
          >
            Open Dashboard &rarr;
          </a>
        </nav>

        {/* 核心价值区 */}
        <div style={{ maxWidth: '780px', width: '100%', textAlign: 'center', margin: 'auto 0' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: '900', lineHeight: '1.15', letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '28px' }}>
            Real-Time Subtitles for <br />
            <span style={{ background: 'linear-gradient(135deg, #34d399 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              OBS & YouTube Streams
            </span>
          </h1>

          {/* 🌟 直播字幕动态演示视窗（整行刷新） */}
          <div style={{ 
            background: 'linear-gradient(180deg, #111827 0%, #0b1120 100%)', 
            border: '1px solid rgba(16, 185, 129, 0.3)', 
            borderRadius: '20px', 
            padding: '24px', 
            marginBottom: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* 视窗顶部状态栏 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: '700' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block', boxShadow: '0 0 8px #ef4444' }}></span> Live Caption
              </span>
              <span>OBS / YouTube Integration</span>
            </div>

            {/* 字幕黑底框模拟（整行切换） */}
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.8)', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              borderRadius: '12px', 
              padding: '28px 20px', 
              minHeight: '90px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)', 
                fontWeight: '600', 
                color: '#ffffff', 
                textShadow: '0 2px 6px rgba(0,0,0,0.9)',
                lineHeight: '1.5',
                transition: 'opacity 0.3s ease-in-out'
              }}>
                {captionLines[currentIndex]}
              </p>
            </div>
            
            <p style={{ margin: '14px 0 0 0', fontSize: '0.8rem', color: '#6b7280' }}>
              ↑ Real-time caption line switching as spoken during stream.
            </p>
          </div>

          {/* 行动按钮 */}
          <a 
            href="https://你的主应用链接" 
            style={{ display: 'block', width: '100%', padding: '16px', background: '#10b981', color: '#030712', borderRadius: '14px', textDecoration: 'none', fontWeight: '800', fontSize: '1.05rem', boxSizing: 'border-box', boxShadow: '0 6px 25px rgba(16,185,129,0.35)', transition: 'transform 0.2s' }}
          >
            Start Streaming With deer ai &rarr;
          </a>
        </div>

        {/* 极简页脚 */}
        <footer style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
          <span>© {new Date().getFullYear()} deer ai (deerai.ca)</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms</a>
          </div>
        </footer>
      </main>
    </>
  );
}
