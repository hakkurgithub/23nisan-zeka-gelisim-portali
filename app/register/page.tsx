'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [grade, setGrade] = useState('1'); // Varsayılan 1. Sınıf
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Kullanıcıyı Auth sistemine kaydet
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName }
      }
    });

    if (authError) return alert('Kayıt Hatası: ' + authError.message);

    // 2. Kullanıcı başarıyla oluştuysa profiles tablosuna ek bilgilerini yaz
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: authData.user.id, 
            first_name: firstName, 
            last_name: lastName, 
            grade_level: grade + ". Sınıf" 
          }
        ]);

      if (profileError) alert('Profil oluşturulamadı: ' + profileError.message);
      else router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <form onSubmit={handleRegister} className="p-8 bg-white shadow-2xl rounded-3xl w-full max-w-md border-4 border-orange-200">
        <h1 className="text-3xl font-extrabold text-center text-orange-600 mb-2">Yeni Öğrenci Kaydı</h1>
        <p className="text-center text-gray-500 mb-8 text-sm">Zeka yolculuğuna ilk adımı at!</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Ad" className="p-3 border-2 rounded-xl outline-none focus:border-orange-400" onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Soyad" className="p-3 border-2 rounded-xl outline-none focus:border-orange-400" onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <select 
          className="w-full p-3 border-2 rounded-xl mb-4 outline-none focus:border-orange-400"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          {[1,2,3,4,5,6,7,8].map(num => (
            <option key={num} value={num}>{num}. Sınıf</option>
          ))}
        </select>

        <input type="email" placeholder="E-posta" className="w-full p-3 border-2 rounded-xl mb-4 outline-none focus:border-orange-400" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Şifre" className="w-full p-3 border-2 rounded-xl mb-6 outline-none focus:border-orange-400" onChange={(e) => setPassword(e.target.value)} required />
        
        <button className="w-full bg-orange-500 text-white p-4 rounded-xl font-bold text-lg hover:bg-orange-600 shadow-lg transition-all active:scale-95">
          Kaydı Tamamla 🚀
        </button>
      </form>
    </div>
  );
}