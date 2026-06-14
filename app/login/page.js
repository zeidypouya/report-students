"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("کد دانشجویی یا رمز عبور اشتباه است");
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at center, #1a2a4a 0%, #050a18 100%)",
      fontFamily: "Tahoma, Arial, sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* دایره‌های نوری پس‌زمینه برای عمق دادن */}
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        background: "rgba(30, 58, 138, 0.3)", filter: "blur(80px)",
        borderRadius: "50%", top: "-10%", left: "-10%"
      }} />
      
      <form onSubmit={handleLogin} style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: "400px",
        padding: "40px",
        borderRadius: "30px",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        animation: "fadeIn 0.8s ease-out"
      }}>
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input::placeholder { color: rgba(255,255,255,0.3); }
        `}</style>

        <h2 style={{
          color: "#fff",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "900",
          marginBottom: "10px",
          direction: "rtl"
        }}>
          ورود به پنل کاربری
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input
            type="text"
            placeholder="کد دانشجویی"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={{
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.2)",
              color: "#fff",
              fontSize: "16px",
              outline: "none",
              textAlign: "center",
              transition: "border 0.3s"
            }}
            onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
            onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.2)",
              color: "#fff",
              fontSize: "16px",
              outline: "none",
              textAlign: "center",
              transition: "border 0.3s"
            }}
            onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
            onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.1)"}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "16px",
            borderRadius: "15px",
            border: "none",
            background: loading ? "#1e3a8a" : "#fff",
            color: "#0a1d4a",
            fontSize: "18px",
            fontWeight: "900",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          {loading ? "در حال بررسی..." : "تایید و ورود"}
        </button>

        <p style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "12px",
          textAlign: "center",
          marginTop: "10px",
          direction: "rtl"
        }}>
          در صورت فراموشی رمز عبور به واحد آموزش مراجعه کنید.
        </p>
      </form>
    </main>
  );
}
