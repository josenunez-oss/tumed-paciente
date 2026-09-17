export async function crearPago({ monto, detalle, idCita, email }) {
  const res = await fetch("/api/crear-pago", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ monto, detalle, idCita, email }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error al crear el pago");
  }

  return res.json();
}
