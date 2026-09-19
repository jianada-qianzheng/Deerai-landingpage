import Head from 'next/head';
import { signIn, useSession } from "next-auth/react";

export default function MinimalLandingPage() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Live Caption - Real-Time Subtitles for Live Streaming</title>
        <meta name="description" content="Professional AI-powered real-time live captions for OBS Studio and YouTube streams." />
      </Head>

      <main style={{
        minHeight: '100vh',
        background: '#090d16',
        color: '#f3f4f6',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '40px 20px',
        boxSizing: 'border-box'
      }}>
        {/* 顶部导航栏 */}
        <nav style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981' }}></span>
            <span style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.025em', color: '#ffffff' }}>Live Caption</span>
          </div>
          {session ? (
            <a href="/app" style={{ padding: '8px 16px', background: '#2563eb', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>
              Open Dashboard &rarr;
            </a>
          ) : (
            <button 
              onClick={() => signIn("google")} 
              style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}
            >
              Sign In
            </button>
          )}
        </nav>

        {/* 核心价值区（一目了然） */}
        <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center', margin: 'auto 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '20px', color: '#34d399', fontSize: '0.8rem', fontWeight: '700', marginBottom: '24px' }}>
            <span>⚡ AI-Powered Live Streaming Subtitles</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.3rem, 5vw, 3.5rem)', fontWeight: '900', lineHeight: '1.15', letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '20px' }}>
            Live Captions for <br />
            <span style={{ background: 'linear-gradient(135deg, #34d399 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              OBS & YouTube Streams
            </span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: '#9ca3af', lineHeight: '1.6', marginBottom: '40px' }}>
            Speak naturally during your broadcast. Our AI instantly converts your voice into professional, real-time subtitles for your live audience with zero lag.
          </p>

          {/* 登录与行动卡片 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            {session ? (
              <div>
                <p style={{ margin: '0 0 16px 0', fontSize: '0.95rem', color: '#d1d5db' }}>
                  Logged in as <strong style={{ color: '#fff' }}>{session.user.email}</strong>
                </p>
                <a 
                  href="/" 
                  style={{ display: 'block', width: '100%', padding: '16px', background: '#10b981', color: '#030712', borderRadius: '14px', textDecoration: 'none', fontWeight: '800', fontSize: '1.05rem', boxSizing: 'border-box', boxShadow: '0 4px 20px rgba(16,185,129,0.3)' }}
                >
                  Enter Live Caption App &rarr;
                </a>
              </div>
            ) : (
              <div>
                <button 
                  onClick={() => signIn("google")} 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', padding: '16px', background: '#ffffff', color: '#111827', border: 'none', borderRadius: '14px', cursor: 'pointer', fontSize: '1.05rem', fontWeight: '800', boxSizing: 'border-box', boxShadow: '0 4px 20px rgba(255,255,255,0.15)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.15v3.14C3.15 21.32 7.23 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.15C.42 8.1 0 9.77 0 12s.42 3.9 1.15 5.38l4.12-3.14z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.68 1.15 6.62l4.12 3.14c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
                  Sign in with Google to Start
                </button>
                <p style={{ margin: '16px 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>Instant setup for OBS & YouTube streams.</p>
              </div>
            )}
          </div>
        </div>

        {/* 极简页脚 */}
        <footer style={{ width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#6b7280', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
          <span>© {new Date().getFullYear()} Live Caption (deerai.ca)</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="/privacy" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy</a>
            <a href="/terms" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms</a>
          </div>
        </footer>
      </main>
    </>
  );
}
