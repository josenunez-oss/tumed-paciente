import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import CalendarioMes from "../components/CalendarioMes.jsx";

export default function MyAppointments() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCargando(false);
        return;
      }
      const { data } = await supabase
        .from("citas")
        .select("*, doctores(nombre, especialidad)")
        .eq("paciente_id", user.id)
        .order("hora", { ascending: true });
      setCitas(data || []);
      setCargando(false);
    }
    cargar();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#EFF3EF", padding: 40 }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1 style={{ color: "#1F4D45", fontSize: 32, fontWeight: 700, marginBottom: 24 }}>
          Mis citas
        </h1>

        {/* Calendario del mes, siempre visible */}
        <CalendarioMes />

        <div style={{ marginTop: 32 }}>
          {cargando && <p style={{ color: "#5B655F" }}>Cargando...</p>}

          {!cargando && citas.length === 0 && (
            <p style={{ color: "#5B655F" }}>Aún no tienes citas agendadas.</p>
          )}

          {citas.map((c) => (
            <div
              key={c.id}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 20,
                marginBottom: 16,
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <h3 style={{ color: "#1F4D45", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                {c.doctores?.nombre || "Médico"}
              </h3>
              <p style={{ color: "#5B655F", marginBottom: 4 }}>
                {c.doctores?.especialidad || ""}
              </p>
              <p style={{ color: "#5B655F" }}>
                Hora: {c.hora} · Estado: {c.estado}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
