import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function MyAppointments() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const user = supabase.auth.getUser();
    supabase
      .from("citas")
      .select("*, doctores(nombre, especialidad)")
      .eq("paciente_id", user.id)
      .then(({ data }) => setCitas(data || []));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Mis citas</h2>
      {citas.map((c) => (
        <div key={c.id} style={{ border: "1px solid #DFE3DE", padding: 16, marginBottom: 12 }}>
          <p>{c.doctores?.nombre} · {c.doctores?.especialidad}</p>
          <p>Hora: {c.hora} · Estado: {c.estado}</p>
        </div>
      ))}
    </div>
  );
}
