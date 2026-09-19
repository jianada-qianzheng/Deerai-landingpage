import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  // 模拟 Hero 区域动态实时跳动的字幕
  const sampleTranscripts = [
    "“欢迎来到 deerai.ca，体验下一代 AI 实时字幕系统...”",
    "“支持 OBS Studio 无缝推流，毫秒级延迟...”",
    "“完美兼容 YouTube 闭环字幕（Closed Caption）...”",
    "“让你的每一场直播、每一个视频都专业生动。”"
  ];
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [activeTab, setActiveTab] = useState("obs");

  // 打字机动态效果
  useEffect(() => {
    let currentString = sampleTranscripts[currentTextIndex];
    let charIndex = 0;
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      if (charIndex <= currentString.length) {
        setDisplayedText(currentString.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % sampleTranscripts.length);
        }, 2500); // 停留 2.5 秒后切换下一句
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentTextIndex]);

  return (
    <>
      <Head>
        <title>Live Caption - AI Real-Time Transcription SaaS | Deer AI</title>
        <meta name="description" content="Professional AI-powered real-time live captioning for OBS Studio and YouTube streams." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#030712', color: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif', overflowX: 'hidden' }}>
        
        {/* 顶部导航栏 */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></span>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.025em', color: '#ffffff' }}>deer<span style={{ color: '#10b981' }}>ai</span>.ca</span>
          </div>
          <a 
            href="/app" // 替换为你实际的 App 访问路径
            style={{ padding: '10px 20px', background: '#2563eb', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(37,99,235,0.4)', transition: 'all 0.2s' }}
          >
            Launch App 🚀
          </a>
        </nav>

        {/* Hero 核心吸引区 */}
        <header style={{ maxWidth: '900px', margin: '80px auto 40px auto', padding: '0 20px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '30px', color: '#34d399', fontSize: '0.85rem', fontWeight: '700', marginBottom: '20px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }}></span>
            Powered by Deepgram Nova-3 AI
          </div>
          
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#ffffff', lineHeight: '1.2', marginBottom: '20px', letterSpacing: '-0.03em' }}>
            Real-Time Live Captions, <br />
            <span style={{ background: 'linear-gradient(135deg, #6ee7b7 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Built for Creators & Streamers.
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#9ca3af', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 40px auto' }}>
            Transform your voice into crystal-clear live captions instantly. Generate encrypted browser source links for OBS Studio or push live automated captions to YouTube streams with zero lag.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a 
              href="/app" 
              style={{ padding: '16px 32px', background: '#10b981', color: '#030712', borderRadius: '16px', textDecoration: 'none', fontWeight: '800', fontSize: '1.05rem', boxShadow: '0 8px 25px rgba(16,185,129,0.3)', transition: 'transform 0.2s' }}
            >
              Get Started Free
            </a>
            <a 
              href="#features" 
              style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', textDecoration: 'none', fontWeight: '700', fontSize: '1.05rem' }}
            >
              Explore Features
            </a>
          </div>
        </header>

        {/* 动态实时字幕预览模拟器（核心亮点） */}
        <section style={{ maxWidth: '800px', margin: '0 auto 80px auto', padding: '0 20px' }}>
          <div style={{ background: '#111827', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
            <div style={{ background: 'rgba(17,24,39,0.9)', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
              </div>
              <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#6b7280' }}>live-caption-preview.wasm</span>
            </div>
            
            <div style={{ padding: '40px 20px', textAlign: 'center', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '1.4rem', fontFamily: 'ui-monospace, monospace', color: '#34d399', fontWeight: '600', margin: 0, textShadow: '0 0 20px rgba(52,211,153,0.3)' }}>
                {displayedText}<span style={{ borderRight: '2px solid #34d399', animation: 'blink 1s infinite' }}></span>
              </p>
            </div>
          </div>
        </section>

        {/* 功能区块与场景切换 */}
        <section id="features" style={{ maxWidth: '1000px', margin: '0 auto 100px auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>Designed for Multi-Platform Power</h2>
            <p style={{ color: '#9ca3af', fontSize: '1rem' }}>Choose your streaming workflow and deploy in seconds.</p>
          </div>

          {/* 切换按钮 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '30px' }}>
            <button
              onClick={() => setActiveTab("obs")}
              style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem', background: activeTab === 'obs' ? '#2563eb' : 'rgba(255,255,255,0.05)', color: activeTab === 'obs' ? '#ffffff' : '#9ca3af', transition: 'all 0.2s' }}
            >
              🎥 OBS Studio Integration
            </button>
            <button
              onClick={() => setActiveTab("cc")}
              style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem', background: activeTab === 'cc' ? '#10b981' : 'rgba(255,255,255,0.05)', color: activeTab === 'cc' ? '#030712' : '#9ca3af', transition: 'all 0.2s' }}
            >
              📺 YouTube Closed Caption
            </button>
          </div>

          {/* 动态卡片内容 */}
          <div style={{ background: '#111827', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
                {activeTab === 'obs' ? 'Secure Encrypted Browser Source for OBS' : 'Automated Closed Captions for YouTube'}
              </h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', marginBottom: '24px' }}>
                {activeTab === 'obs' 
                  ? 'Generate a secure, encrypted token URL instantly. Add it as a browser source in OBS Studio, and your spoken words will render as styled real-time captions directly on your video stream.'
                  : 'Seamlessly link your YouTube stream closed caption URL. Our system pushes real-time text sequences automatically, providing accessibility and engagement to your audience.'}
              </p>
              <a 
                href="/app" 
                style={{ display: 'inline-block', padding: '12px 24px', background: activeTab === 'obs' ? '#2563eb' : '#10b981', color: activeTab === 'obs' ? '#ffffff' : '#030712', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}
              >
                Try {activeTab === 'obs' ? 'OBS Mode' : 'YouTube CC Mode'} &rarr;
              </a>
            </div>
            
            <div style={{ background: '#030712', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace', fontSize: '0.85rem', color: '#34d399' }}>
              <p style={{ margin: '0 0 10px 0', color: '#6b7280' }}>// Workflow preview</p>
              <p style={{ margin: '0 0 8px 0' }}>$ init_session --secure-token</p>
              <p style={{ margin: '0 0 8px 0' }}>$ model: &quot;nova-3-realtime&quot;</p>
              <p style={{ margin: '0 0 8px 0' }}>$ latency: &lt; 500ms</p>
              <p style={{ margin: '0', color: '#3b82f6' }}>&gt; Status: Ready for broadcast 🚀</p>
            </div>
          </div>
        </section>

        {/* 底部版权 */}
        <footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#6b7280', fontSize: '0.85rem' }}>
          <p style={{ margin: '0 0 10px 0' }}>© {new Date().getFullYear()} Deer AI (deerai.ca). All rights reserved.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </footer>

      </div>
    </>
  );
}
