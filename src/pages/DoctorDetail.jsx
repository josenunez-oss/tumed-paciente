import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    supabase
      .from("doctores")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setDoctor(data));
  }, [id]);

  if (!doctor) {
    return (
      <div style={{ minHeight: "100vh", background: "#EFF3EF", padding: 40 }}>
        <p style={{ color: "#5B655F" }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#EFF3EF", padding: 40 }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        }}>
          <h1 style={{ color: "#1F4D45", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            {doctor.nombre}
          </h1>
          <p style={{ color: "#5B655F", fontSize: 18, marginBottom: 8 }}>
            {doctor.especialidad}
          </p>
          <p style={{ color: "#5B655F", marginBottom: 8 }}>
            {doctor.experiencia}
          </p>
          <p style={{ color: "#C08A2E", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
            ${doctor.precio}
          </p>

          <Link
            to={`/book/${doctor.id}`}
            style={{
              display: "inline-block",
              padding: "14px 28px",
              borderRadius: 8,
              background: "#1F4D45",
              color: "#fff",
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Agendar cita
          </Link>
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
