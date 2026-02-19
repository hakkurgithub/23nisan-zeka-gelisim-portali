export default function MainLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '20px', background: '#1d3557', color: 'white', display: 'flex', gap: '20px' }}>
        <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Ana Sayfa</a>
        <a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Panel</a>
        <a href="/atolyeler" style={{ color: 'white', textDecoration: 'none' }}>Atölyeler</a>
      </nav>
      <main style={{ flex: 1, padding: '20px' }}>{children}</main>
      <footer style={{ padding: '20px', textAlign: 'center', background: '#f1f1f1' }}>2026 Zeka Portalı</footer>
    </div>
  );
}
