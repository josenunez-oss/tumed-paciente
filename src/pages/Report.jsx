import { useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function Report() {
  const [motivo, setMotivo] = useState("");
  const [detalle, setDetalle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = supabase.auth.getUser();
    const { error } = await supabase.from("reportes").insert({
      paciente_id: user.id,
      motivo,
      detalle,
    });
    if (error) return alert(error.message);
    alert("Reporte enviado");
    setMotivo("");
    setDetalle("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 40, maxWidth: 400 }}>
      <h2>Reportar un problema</h2>
      <input placeholder="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
      <textarea placeholder="Detalle" value={detalle} onChange={(e) => setDetalle(e.target.value)} />
      <button type="submit">Enviar</button>
    </form>
  );
}
