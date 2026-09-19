import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function Perfil() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        const { data } = await supabase
          .from("pacientes")
          .select("nombre")
          .eq("email", user.email)
          .maybeSingle();
        if (data) setNombre(data.nombre || "");
      }
    }
    cargar();
  }, []);

  async function guardar(e) {
    e.preventDefault();
    setError("");
    setGuardado(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("pacientes")
      .update({ nombre })
      .eq("email", user.email);

    if (error) {
      setError(error.message);
      return;
    }
    setGuardado(true);
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#EFF3EF",
      padding: 20,
    }}>
      <div style={{ maxWidth: 600, width: "100%" }}>
        <button
          onClick={() => navigate('/')}
          title="Volver"
          style={{
            background: "transparent",
            border: "none",
            fontSize: 28,
            cursor: "pointer",
            color: "#1F4D45",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          ←
        </button>

        <h1 style={{ color: "#1F4D45", fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
          Perfil
        </h1>

        <form onSubmit={guardar} style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#1F4D45", marginBottom: 6 }}>
            Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #DFE3DE",
              fontSize: 16,
              marginBottom: 16,
              boxSizing: "border-box",
            }}
          />

          <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#1F4D45", marginBottom: 6 }}>
            Correo
          </label>
          <input
            type="email"
            value={email}
            readOnly
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #DFE3DE",
              fontSize: 16,
              marginBottom: 16,
              background: "#F5F5F5",
              boxSizing: "border-box",
            }}
          />

          {error && <p style={{ color: "#C0392B", fontSize: 14 }}>{error}</p>}
          {guardado && <p style={{ color: "#1F4D45", fontSize: 14 }}>✓ Nombre guardado</p>}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 8,
              background: "#1F4D45",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
