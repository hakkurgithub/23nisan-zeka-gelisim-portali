'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function PuzzleGame() {
  const [pieces, setPieces] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  // Temsili 4 parcalı puzzle mantıgı (Gelistirilebilir)
  const initialPieces = [
    { id: 1, pos: { x: 0, y: 0 }, currentPos: null, label: 'Sol Üst' },
    { id: 2, pos: { x: 1, y: 0 }, currentPos: null, label: 'Sağ Üst' },
    { id: 3, pos: { x: 0, y: 1 }, currentPos: null, label: 'Sol Alt' },
    { id: 4, pos: { x: 1, y: 1 }, currentPos: null, label: 'Sağ Alt' }
  ];

  useEffect(() => {
    setPieces(initialPieces.sort(() => Math.random() - 0.5));
  }, []);

  const handleComplete = async () => {
    setIsComplete(true);
    const duration = (Date.now() - startTime) / 1000;
    
    // Uzamsal zekayı kaydet (Süreye göre puan ver)
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const spatialScore = Math.max(100 - Math.floor(duration), 10);
      await supabase.from('cognitive_scores').upsert({ 
        user_id: user.id, 
        spatial_score: spatialScore,
        last_updated: new Date()
      });
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', background: 'white', borderRadius: '20px' }}>
      <h3 style={{ color: '#1d3557' }}>TBMM Yapboz G\u00f6revi</h3>
      <p>Par\u00e7alar\u0131 do\u011fru s\u0131rayla yerle\u015ftir!</p>
      
      {!isComplete ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '300px', margin: 'auto' }}>
          {pieces.map(p => (
            <div 
              key={p.id} 
              onClick={() => pieces.every(x => x.id) && pieces.length === 4 && handleComplete()}
              style={{ padding: '40px 10px', border: '2px dashed #457b9d', cursor: 'pointer', borderRadius: '10px' }}
            >
              Par\u00e7a {p.id}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: 'green', fontWeight: 'bold' }}>
          \u000a Harika! TBMM Binas\u0131n\u0131 Tamamlad\u0131n!
        </div>
      )}
      <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px', background: '#e63946', color: 'white', border: 'none', borderRadius: '5px' }}>S\u0131f\u0131rla</button>
    </div>
  );
}
