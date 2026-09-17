import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { Link } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    supabase
      .from("doctores")
      .select("*")
      .eq("activo", true)
      .then(({ data, error }) => {
        if (!error) setDoctors(data || []);
        setCargando(false);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#EFF3EF", padding: 40 }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ color: "#1F4D45", fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
          Médicos disponibles
        </h1>

        {cargando && <p style={{ color: "#5B655F" }}>Cargando...</p>}

        {!cargando && doctors.length === 0 && (
          <p style={{ color: "#5B655F" }}>No hay médicos registrados todavía.</p>
        )}

        {doctors.map((d) => (
          <div
            key={d.id}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ color: "#1F4D45", fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
              {d.nombre}
            </h3>
            <p style={{ color: "#5B655F", marginBottom: 4 }}>
              {d.especialidad} · {d.experiencia}
            </p>
            <p style={{ color: "#C08A2E", fontWeight: 600, marginBottom: 12 }}>
              ${d.precio}
            </p>
            <Link
              to={`/doctor/${d.id}`}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                background: "#1F4D45",
                color: "#fff",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
