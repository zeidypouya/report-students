"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const pressDown = (e) => {
    e.currentTarget.style.transform = "translateY(10px)";
    e.currentTarget.style.boxShadow = `
      0 3px 0 rgba(255,255,255,0.1),
      0 8px 18px rgba(0,0,0,0.4),
      inset 0 3px 8px rgba(0,0,0,0.25)
    `;
  };

  const pressUp = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = `
      0 10px 0 rgba(255,255,255,0.15),
      0 20px 40px rgba(0,0,0,0.45),
      inset 0 1px 0 rgba(255,255,255,0.4)
    `;
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(35px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <main
        style={{
          position: "relative",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#000",
          fontFamily: "Tahoma, Arial, sans-serif",
        }}
      >
        {/* ویدیو پس‌زمینه محو */}
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/nurse-walking.mp4"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            width: "110%",
            height: "110%",
            objectFit: "cover",
            filter: "blur(45px) brightness(0.6)",
            transform: "scale(1.1)",
          }}
        />

        {/* ویدیو اصلی */}
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/nurse-walking.mp4"
          style={{
            position: "relative",
            zIndex: 1,
            maxHeight: "100vh",
            width: "auto",
          }}
        />

        {/* متن و دکمه */}
        <div
          style={{
            position: "absolute",
            zIndex: 20,
            bottom: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
            width: "100%",
            opacity: 0,
            animation: "fadeUp 1.2s ease-out forwards",
            animationDelay: "0.4s",
          }}
        >
          <h1
            style={{
              color: "#0a1d4a",
              fontSize: "26px",
              fontWeight: "900",
              textAlign: "center",
              textShadow:
                "0 0 10px rgba(255,255,255,0.4), 0 0 2px rgba(255,255,255,0.7)",
              margin: 0,
              direction: "rtl",
            }}
          >
            سامانه مشاهده نتایج کارآموزی
          </h1>

          <button
            onClick={() => router.push("/login")}
            onMouseDown={pressDown}
            onMouseUp={pressUp}
            onMouseLeave={pressUp}
            style={{
              padding: "16px 65px",
              fontSize: "20px",
              fontWeight: "900",
              color: "#0a1d4a",
              textTransform: "uppercase",
              letterSpacing: "2px",
              cursor: "pointer",
              border: "1.5px solid rgba(255,255,255,0.5)",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(15px)",
              WebkitBackdropFilter: "blur(15px)",
              boxShadow: `
                0 10px 0 rgba(255,255,255,0.15),
                0 20px 40px rgba(0,0,0,0.45),
                inset 0 1px 0 rgba(255,255,255,0.4)
              `,
              transition: "all 0.12s ease",
              outline: "none",
            }}
          >
            LOGIN
          </button>
        </div>
      </main>
    </>
  );
}
