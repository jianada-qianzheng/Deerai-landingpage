import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Deer AI</title>
      </Head>
      <div style={{ minHeight: '100vh', background: '#030712', color: '#f3f4f6', padding: '60px 20px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#ffffff' }}>Terms of Service</h1>
          <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
            Welcome to Deer AI. By accessing or using deerai.ca, you agree to be bound by these terms.
          </p>
          <p style={{ marginTop: '30px' }}>
            <a href="/" style={{ color: '#10b981', textDecoration: 'none', fontWeight: '700' }}>&larr; Back to Home</a>
          </p>
        </div>
      </div>
    </>
  );
}
