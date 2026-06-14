"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [student, setStudent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me")
      .then((res) => {
        if (!res.ok) router.push("/");
        return res.json();
      })
      .then((data) => setStudent(data));
  }, []);

  if (!student) return (
    <div style={{ height: "100vh", background: "#050a18", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "BTitr" }}>
      در حال فراخوانی اطلاعات...
    </div>
  );

  const correctPercentage = Math.round((student.correct / student.total) * 100);

  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top right, #1e293b 0%, #050a18 100%)",
      color: "white",
      padding: "20px",
      direction: "rtl",
      fontFamily: "BTitr, Tahoma",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <style jsx global>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .stat-card { animation: slideUp 0.6s ease-out forwards; }
      `}</style>

      {/* Header */}
      <div style={{ width: "100%", maxWidth: "900px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", marginTop: "20px" }}>
        <div>
          <h1 style={{ fontSize: "28px", margin: 0, textShadow: "0 0 20px rgba(255,255,255,0.2)" }}>پنل اختصاصی {student.name}</h1>
          <p style={{ opacity: 0.6, fontSize: "14px", marginTop: "5px" }}>سامانه پایش عملکرد کارآموزی</p>
        </div>
        <button onClick={async () => { await fetch('/api/logout'); router.push('/'); }} 
          style={{ background: "rgba(255,70,70,0.1)", border: "1px solid rgba(255,70,70,0.3)", color: "#ff6b6b", padding: "8px 20px", borderRadius: "12px", cursor: "pointer", fontFamily: "BTitr" }}>
          خروج
        </button>
      </div>

      <div style={{ width: "100%", maxWidth: "900px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        
        {/* Card 1: Main Stats */}
        <div className="stat-card" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", borderRadius: "30px", padding: "30px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <span style={{ fontSize: "18px", color: "#94a3b8" }}>رتبه در کلاس</span>
             <div style={{ background: "linear-gradient(45deg, #f59e0b, #fbbf24)", color: "#000", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "bold", boxShadow: "0 0 15px rgba(245,158,11,0.5)" }}>
               {student.rank}
             </div>
          </div>
          
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto" }}>
              <svg viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray={`${correctPercentage}, 100`} strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{correctPercentage}%</div>
            </div>
            <p style={{ marginTop: "15px", fontSize: "16px" }}>{student.correct} پاسخ صحیح از {student.total} سوال</p>
          </div>
        </div>

        {/* Card 2: Scores */}
        <div className="stat-card" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", borderRadius: "30px", padding: "30px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
           <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "15px" }}>
              <span style={{ color: "#94a3b8" }}>نمره واقعی:</span>
              <span style={{ fontSize: "18px" }}>{student.realScore}</span>
           </div>
           <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "rgba(59,130,246,0.1)", borderRadius: "15px", border: "1px solid rgba(59,130,246,0.3)" }}>
              <span style={{ color: "#60a5fa" }}>نمره نهایی:</span>
              <span style={{ fontSize: "22px", color: "#60a5fa" }}>{student.finalScore}</span>
           </div>
           
           {/* ✅ نشان افتخار اختصاصی فقط برای مبینا */}
           {student.firstParticipant && (
             <div style={{ 
               marginTop: "10px", 
               background: "linear-gradient(90deg, rgba(74,222,128,0.2) 0%, rgba(74,222,128,0.02) 100%)", 
               padding: "10px", 
               borderRadius: "12px", 
               borderRight: "4px solid #4ade80",
               display: "flex",
               alignItems: "center",
               gap: "10px"
             }}>
               <span style={{ fontSize: "20px" }}>🏆</span>
               <div style={{ display: "flex", flexDirection: "column" }}>
                 <span style={{ fontSize: "13px", color: "#4ade80" }}>رکورددار سرعت شرکت در آزمون</span>
                 <span style={{ fontSize: "10px", opacity: 0.7 }}>اولین نفر در تمامی مراحل</span>
               </div>
             </div>
           )}
        </div>

        {/* Card 3: Behavioral Analysis */}
        <div className="stat-card" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", borderRadius: "30px", padding: "30px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", color: "#3b82f6" }}>ارزیابی کیفی عملکرد</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", textAlign: "center" }}>
             <div style={{ background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "15px" }}>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Procedure</div>
                <div style={{ fontSize: "24px", color: student.procedure === 'A' ? '#4ade80' : '#facc15' }}>{student.procedure}</div>
             </div>
             <div style={{ background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "15px" }}>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>Discipline</div>
                <div style={{ fontSize: "24px", color: student.discipline === 'A' ? '#4ade80' : '#facc15' }}>{student.discipline}</div>
             </div>
             <div style={{ background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "15px" }}>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>نظم و حضور</div>
                <div style={{ fontSize: "24px", color: student.punctuality === 'A' ? '#4ade80' : '#facc15' }}>{student.punctuality}</div>
             </div>
          </div>
        </div>

        {/* Card 4: Weaknesses */}
        <div className="stat-card" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", borderRadius: "30px", padding: "30px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <h3 style={{ margin: "0 0 20px 0", fontSize: "20px", color: "#f87171" }}>نقاط قابل بهبود</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {student.weaknesses.map((w, i) => (
              <span key={i} style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", padding: "5px 15px", borderRadius: "20px", fontSize: "14px", border: "1px solid rgba(248,113,113,0.2)" }}>
                {w}
              </span>
            ))}
          </div>
          {student.note && <p style={{ color: "#fca5a5", fontSize: "13px", marginTop: "15px" }}>💡 {student.note}</p>}
        </div>

      </div>

      <footer style={{ marginTop: "40px", opacity: 0.4, fontSize: "12px" }}>
        دانشکده پرستاری - سامانه گزارش‌دهی هوشمند
      </footer>
    </main>
  );
}
