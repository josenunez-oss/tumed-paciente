import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { crearPago } from "../lib/khipu.js";

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hora, setHora] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleBook(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setCargando(false);
      return navigate("/login");
    }

    const { data: cita, error: citaError } = await supabase
      .from("citas")
      .insert({ doctor_id: id, paciente_id: user.id, hora, estado: "pendiente" })
      .select()
      .single();

    if (citaError) {
      setCargando(false);
      return setError(citaError.message);
    }

    try {
      const { url } = await crearPago({
        monto: 35000,
        detalle: "Cita médica TuMed",
        idCita: cita.id,
        email: user.email,
      });
      window.location.href = url;
    } catch (err) {
      setCargando(false);
      setError(err.message || "Error al crear el pago");
    }
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
            Agendar cita
          </h1>
          <p style={{ color: "#5B655F", marginBottom: 24 }}>
            Elige la hora y paga para confirmar tu cita.
          </p>

          {error && (
            <p style={{ color: "#c0392b", fontSize: 14, marginBottom: 16 }}>{error}</p>
          )}

          <form onSubmit={handleBook} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              placeholder="Hora (ej: 10:30)"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              style={{ padding: 12, borderRadius: 8, border: "1px solid #DFE3DE", fontSize: 16 }}
            />
            <button
              type="submit"
              disabled={cargando}
              style={{
                padding: 14,
                borderRadius: 8,
                border: "none",
                background: "#1F4D45",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                cursor: cargando ? "not-allowed" : "pointer",
              }}
            >
              {cargando ? "Procesando..." : "Pagar y agendar"}
            </button>
          </form>
        </div>

        <Link
          to="/doctors"
          style={{ display: "inline-block", marginTop: 20, color: "#1F4D45", textDecoration: "none" }}
        >
          ← Volver a médicos
        </Link>
      </div>
    </div>
  );
}
