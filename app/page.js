'use client';
import MainLayout from '../components/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div style={{ fontFamily: 'sans-serif', color: '#1d3557' }}>
        <section style={{ background: 'linear-gradient(135deg, #e63946 0%, #1d3557 100%)', padding: '100px 20px', textAlign: 'center', color: 'white', borderRadius: '0 0 50px 50px' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Gelecegin Dahileri Icin 23 Nisan Zeka Portali</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 30px' }}>Cocuklarimizin bilissel yeteneklerini bilimsel metodlarla olcen dijital gelisim platformu.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <a href="/login" style={{ padding: '15px 35px', background: '#f1faee', color: '#1d3557', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none' }}>Hemen Kesfet</a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
