import { useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function Report() {
  const [motivo, setMotivo] = useState("");
  const [detalle, setDetalle] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setExito(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return setError("Debes iniciar sesión");

    const { error } = await supabase.from("reportes").insert({
      paciente_id: user.id,
      motivo,
      detalle,
    });

    if (error) return setError(error.message);

    setMotivo("");
    setDetalle("");
    setExito(true);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#EFF3EF", padding: 40 }}>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        }}>
          <h1 style={{ color: "#1F4D45", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            Reportar un problema
          </h1>
          <p style={{ color: "#5B655F", marginBottom: 24 }}>
            Cuéntanos qué pasó y lo revisaremos.
          </p>

          {error && (
            <p style={{ color: "#c0392b", fontSize: 14, marginBottom: 16 }}>{error}</p>
          )}
          {exito && (
            <p style={{ color: "#1F4D45", fontSize: 14, marginBottom: 16 }}>
              Reporte enviado correctamente.
            </p>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              placeholder="Motivo"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              style={{ padding: 12, borderRadius: 8, border: "1px solid #DFE3DE", fontSize: 16 }}
            />
            <textarea
              placeholder="Detalle"
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              rows={4}
              style={{ padding: 12, borderRadius: 8, border: "1px solid #DFE3DE", fontSize: 16, resize: "vertical" }}
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
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
