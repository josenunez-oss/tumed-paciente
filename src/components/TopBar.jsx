import { Link, useNavigate } from "react-router-dom";
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

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {/* Cuenta: pictograma de persona */}
        <Link
          to="/mis-citas"
          title="Cuenta"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "#fff",
            border: "1px solid #DFE3DE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            textDecoration: "none",
          }}
        >
          🚻
        </Link>

        {/* Información de pago: billetera */}
        <Link
          to="/mis-citas"
          title="Información de pago"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "#fff",
            border: "1px solid #DFE3DE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            textDecoration: "none",
          }}
        >
          👛
        </Link>

        {/* Citas: calendario */}
        <Link
          to="/mis-citas"
          title="Citas"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "#fff",
            border: "1px solid #DFE3DE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            textDecoration: "none",
          }}
        >
          📅
        </Link>

        {/* Cerrar sesión: puerta pequeña */}
        <button
          onClick={cerrarS
