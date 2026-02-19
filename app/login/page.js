'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleAuth = async (type) => {
    if (!email || !password) {
      setErrorMsg("Lutfen e-posta ve sifre giriniz.");
      return;
    }
    setLoading(true);
    setErrorMsg('');
    const { data, error } = type === 'login' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      if (type === 'login') router.push('/dashboard');
      else alert("Kayit basarili! Simdi giris yapabilirsiniz.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1faee' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#1d3557', marginBottom: '30px' }}>Zeka Portali</h2>
        <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Sifre" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        {errorMsg && <p style={{ color: '#e63946', fontSize: '14px', marginBottom: '15px' }}>{errorMsg}</p>}
        <button onClick={() => handleAuth('login')} disabled={loading} style={{ ...btnStyle, backgroundColor: '#457b9d', marginBottom: '10px' }}>Giris Yap</button>
        <button onClick={() => handleAuth('signup')} disabled={loading} style={{ ...btnStyle, background: 'none', color: '#1d3557', border: '1px solid #1d3557' }}>Yeni Kayit</button>
      </div>
    </div>
  );
}
const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' };
const btnStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' };
