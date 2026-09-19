import { useState } from "react";

export default function BannerDoctores() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div style={{
      width: "100%",
      position: "relative",
      borderRadius: 12,
      overflow: "hidden",
    }}>
      <a
        href="https://tumed-doctores-aco6axszu-tu-med.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", textDecoration: "none" }}
      >
        <div
          style={{
            width: "100%",
            height: 180,
            backgroundImage: "url('https://images.pexels.com/photos/7653084/pexels-photo-7653084.jpeg?auto=compress&cs=tinysrgb&w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            transform: "scale(1.05)",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(31,77,69,0.6)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: 16,
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
            ¿Eres médico?
          </h3>
          <p style={{ fontSize: 14, margin: "6px 0 0 0", opacity: 0.9 }}>
            Regístrate en la web de doctores y comienza a atender consultas.
          </p>
        </div>
      </a>

      {/* Botón para esconder el banner */}
      <button
        onClick={() => setVisible(false)}
        title="Ocultar banner"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          border: "none",
          borderRadius: 50,
          width: 26,
          height: 26,
          cursor: "pointer",
          fontSize: 14,
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
}
