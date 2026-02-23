"use client";
import { useEffect, useState } from "react";
// Kesin çözüm: Relative path kullanıyoruz
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          setProfile(data);
        }
      } catch (err) {
        console.error("Hata:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <div className="p-10">Yükleniyor...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Hoş geldin, {profile?.first_name || "Öğrenci"}!</h1>
      <p className="mt-4 bg-blue-50 p-4 rounded border">Sınıf: {profile?.grade_level || "Belirtilmedi"}</p>
      <div className="mt-6 bg-orange-500 text-white p-4 rounded inline-block font-bold">
        XP Puanın: {profile?.xp_points || 0}
      </div>
    </div>
  );
} 
