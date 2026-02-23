"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen font-medium">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Üst Karşılama Alanı */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Merhaba, {profile?.first_name || 'Öğrenci'}! 👋</h1>
          <p className="text-gray-500 text-sm">Zeka yolculuğunda bugün neler yapacaksın?</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            {profile?.grade_level || profile?.grade}. Sınıf
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* İstatistik Kartı 1 */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
          <p className="opacity-80 text-sm uppercase tracking-wider font-bold">Toplam Puan</p>
          <h3 className="text-4xl font-black mt-2">{profile?.xp_points || 0} XP</h3>
          <div className="mt-4 bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="bg-white h-full" style={{ width: '40%' }}></div>
          </div>
          <p className="text-xs mt-2 opacity-80 italic text-right">Bir sonraki seviyeye 60 XP kaldı</p>
        </div>

        {/* İstatistik Kartı 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-sm font-bold uppercase">Mevcut Seviye</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-4xl font-bold text-gray-800">{profile?.level || 1}</h3>
            <span className="text-gray-400 pb-1 text-sm">Seviye Uzman</span>
          </div>
          <button className="w-full mt-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors">
            Gelişim Grafiği
          </button>
        </div>

        {/* Hızlı Başlat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <h4 className="font-bold text-gray-800 mb-2">Günün Sorusu Hazır!</h4>
          <p className="text-gray-500 text-xs mb-4">Bugün +15 XP kazanmak için soruyu çöz.</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-md transition-all transform hover:scale-105">
            Zeka Oyununa Başla 🚀
          </button>
        </div>
      </main>

      {/* Veri Takibi Bölümü */}
      <section className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Son Aktiviteler</h3>
          <span className="text-blue-500 text-xs font-bold cursor-pointer">Hepsini Gör</span>
        </div>
        <div className="p-6 text-center text-gray-400 text-sm italic">
          Henüz bir aktivite kaydın bulunmuyor. İlk oyununu oyna!
        </div>
      </section>
    </div>
  );
}