'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { calculateRank } from '../../lib/rankService';
import MainLayout from '../../components/MainLayout';

export default function Dashboard() {
  const [profile, setProfile] = useState({ total_xp: 0 });
  const [rank, setRank] = useState({ title: 'Yükleniyor...', color: '#666' });

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('total_xp')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile(data);
          setRank(calculateRank(data.total_xp));
        }
      }
    };
    getProfile();
  }, []);

  return (
    <MainLayout>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-block', 
          padding: '10px 30px', 
          borderRadius: '50px', 
          backgroundColor: rank.color, 
          color: 'white', 
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Rütbe: {rank.title}
        </div>
        <h2>Toplam XP: {profile.total_xp}</h2>
        <p>Bir sonraki rütbe için daha fazla oyun oyna!</p>
      </div>
    </MainLayout>
  );
}
