import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import { crearPago } from "../lib/khipu.js";

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hora, setHora] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleBook(e) {
    e.preventDefault();
    setCargando(true);

    const user = supabase.auth.getUser();
    if (!user) return alert("Debes iniciar sesión");

    const { data: cita } = await supabase
      .from("citas")
      .insert({ doctor_id: id, paciente_id: user.id, hora })
      .select()
      .single();

    const { url } = await crearPago({
      monto: 35000,
      detalle: "Cita médica",
      idCita: cita.id,
    });

    window.location.href = url;
  }

  return (
    <form onSubmit={handleBook} style={{ padding: 40, maxWidth: 400 }}>
      <h2>Agendar cita</h2>
      <input placeholder="Hora (ej: 10:30)" value={hora} onChange={(e) => setHora(e.target.value)} />
      <button type="submit" disabled={cargando}>{cargando ? "Procesando..." : "Pagar y agendar"}</button>
    </form>
  );
}
