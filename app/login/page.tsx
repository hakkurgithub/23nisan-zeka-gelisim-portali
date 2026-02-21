'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert('Hata: ' + error.message);
    else router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-2xl w-96">
        <h1 className="text-2xl font-bold text-center text-sky-600 mb-6">Zeka Portalı Giriş</h1>
        <input
          type="email"
          placeholder="E-posta"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          className="w-full p-3 border rounded-lg mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-sky-500 text-white p-3 rounded-lg font-semibold hover:bg-sky-600 transition">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}