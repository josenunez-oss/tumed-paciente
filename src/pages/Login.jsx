import { useState } from "react";
import { supabase } from "../lib/supabase.js";
import { useNavigate, Link } from "react-router-dom";
import BannerDoctores from '../components/BannerDoctores.jsx'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    navigate("/doctors");
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#EFF3EF",
      padding: 20,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        padding: 40,
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}>
        <h1 style={{ color: "#1F4D45", fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
          TuMed
        </h1>
        <p style={{ color: "#5B655F", marginBottom: 24 }}>
          Inicia sesión para continuar
        </p>

        {error && (
          <p style={{ color: "#c0392b", fontSize: 14, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #DFE3DE", fontSize: 16 }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 12, borderRadius: 8, border: "1px solid #DFE3DE", fontSize: 16 }}
          />
          <button
            type="submit"
            style={{
              padding: 14,
              borderRadius: 8,
              border: "none",
              background: "#1F4D45",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Iniciar sesión
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, color: "#5B655F" }}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" style={{ color: "#C08A2E", fontWeight: 600 }}>
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
