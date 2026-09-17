import { useState } from "react";
import { supabase } from "../lib/supabase.js";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      return setError("Las contraseñas no coinciden");
    }
    if (password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres");
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setError(error.message);

    alert("Cuenta creada. Revisa tu email para confirmar.");
    navigate("/login");
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
          Crea tu cuenta
        </p>

        {error && (
          <p style={{ color: "#c0392b", fontSize: 14, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
            Crear cuenta
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, color: "#5B655F" }}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" style={{ color: "#C08A2E", fontWeight: 600 }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
