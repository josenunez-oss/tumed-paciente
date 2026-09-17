import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { Link } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    supabase.from("doctores").select("*").eq("activo", true).then(({ data }) => {
      setDoctors(data || []);
    });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Médicos disponibles</h2>
      {doctors.map((d) => (
        <div key={d.id} style={{ border: "1px solid #DFE3DE", padding: 16, marginBottom: 12 }}>
          <h3>{d.nombre}</h3>
          <p>{d.especialidad} · {d.experiencia}</p>
          <p>Precio: ${d.precio}</p>
          <Link to={`/doctor/${d.id}`}>Ver detalle</Link>
        </div>
      ))}
    </div>
  );
}
