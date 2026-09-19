import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function TopBar() {
  const navigate = useNavigate();

  async function cerrarSesion() {
    await supabase.auth.signOut();
    navigate('/');
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

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Link
          to="/mis-citas"
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            background: "#fff",
            color: "#1F4D45",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            border: "1px solid #DFE3DE",
          }}
        >
          Cuenta
        </Link>
        <Link
          to="/mis-citas"
          style={{
            padding: "8px 14px",
            borderRadius: 8,
            background: "#fff",
            color: "#1F4D45",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            border: "1px solid #DFE3DE",
          }}
        >
          Pagos
        </Link>

        <button
          onClick={cerrarSesion}
          title="Cerrar sesión"
          style={{
            background: "#C0392B",
            border: "none",
            borderRadius: 10,
            width: 34,
            height: 34,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            boxShadow: "0 2px 6px rgba(192,57,43,0.3)",
          }}
        >
          <span style={{ fontSize: 8, fontWeight: 700, color: "#fff", letterSpacing: 0.5, lineHeight: 1 }}>
            EXIT
          </span>
        </button>
      </div>
    </div>
  );
}
