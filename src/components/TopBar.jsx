import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function TopBar() {
  const navigate = useNavigate();

  async function cerrarSesion() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = '/';
    }
  }

  return (
    <div style={{
      width: "100%",
      maxWidth: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 24,
    }}>
      <button
        onClick={() => navigate('/')}
        title="Volver al inicio"
        style={{
          background: "transparent",
          border: "none",
          fontSize: 28,
          cursor: "pointer",
          color: "#1F4D45",
          lineHeight: 1,
        }}
      >
        ←
      </button>

      <button
        onClick={cerrarSesion}
        title="Cerrar sesión"
        style={{
          background: "transparent",
          border: "1px solid #E3B8B2",
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: "#B5564B",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1 }}>
          Salir
        </span>
      </button>
    </div>
  );
}
