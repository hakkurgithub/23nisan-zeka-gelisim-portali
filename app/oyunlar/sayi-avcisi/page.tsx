"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SayiAvcisi() {
  const [question, setQuestion] = useState({ a: 0, b: 0, op: "+" });
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  // Yeni soru oluştur
  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    setQuestion({ a, b, op: "+" });
    setAnswer("");
  };

  useEffect(() => { generateQuestion(); }, []);

  const checkAnswer = async () => {
    if (parseInt(answer) === question.a + question.b) {
      const newScore = score + 10;
      setScore(newScore);
      setMessage("Harika! +10 XP Kazandın 🌟");
      
      // Supabase'de XP Güncelle
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.rpc('increment_xp', { x: 10 }); // SQL fonksiyonu gerektirir veya direkt update
      }
      
      setTimeout(() => {
        setMessage("");
        generateQuestion();
      }, 1500);
    } else {
      setMessage("Tekrar dene! 💪");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-3xl font-black text-orange-600 mb-4">Sayı Avcısı 🏹</h1>
        <p className="text-gray-600 mb-8 font-medium">Doğru cevabı bul, XP'leri topla!</p>
        
        <div className="text-5xl font-bold mb-8 p-6 bg-orange-100 rounded-2xl text-orange-800">
          {question.a} + {question.b} = ?
        </div>

        <input 
          type="number" 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full text-center text-2xl p-4 border-4 border-orange-200 rounded-2xl mb-4 focus:border-orange-500 outline-none"
          placeholder="Cevabın..."
        />

        <button 
          onClick={checkAnswer}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg transition-transform active:scale-95"
        >
          KONTROL ET 🚀
        </button>

        {message && <p className="mt-4 font-bold text-lg text-green-600 animate-bounce">{message}</p>}
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
          <span className="font-bold text-gray-500 text-sm">SKOR: {score} XP</span>
          <Link href="/dashboard" className="text-orange-500 font-bold text-sm underline">Panele Dön</Link>
        </div>
      </div>
    </div>
  );
}