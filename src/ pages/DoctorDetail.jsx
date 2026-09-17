import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    supabase.from("doctores").select("*").eq("id", id).single().then(({ data }) => {
      setDoctor(data);
    });
  }, [id]);

  if (!doctor) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>{doctor.nombre}</h2>
      <p>{doctor.especialidad}</p>
      <p>{doctor.experiencia}</p>
      <p>Precio: ${doctor.precio}</p>
      <Link to={`/book/${doctor.id}`}>Agendar cita</Link>
    </div>
  );
}
