const KHIPU_RECEIVER_ID = process.env.VITE_KHIPU_RECEIVER_ID;
const KHIPU_SECRET_KEY = process.env.VITE_KHIPU_SECRET_KEY;
const KHIPU_API_KEY = process.env.KHIPU_API_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { monto, detalle, idCita } = req.body;

  if (!monto || !detalle || !idCita) {
    return res.status(400).json({ error: "Faltan datos del pago" });
  }

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  try {
    const respuesta = await fetch("https://khipu.com/api/2.0/paymentRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${KHIPU_API_KEY}`,
      },
      body: JSON.stringify({
        subject: detalle,
        amount: monto,
        currency: "CLP",
        transaction_id: idCita,
        return_url: `${baseUrl}/my-appointments`,
        cancel_url: `${baseUrl}/doctors`,
        notify_url: `${baseUrl}/api/notificacion`,
        payer_email: req.body.email || "",
      }),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return res.status(respuesta.status).json({ error: data.message || "Error al crear el pago" });
    }

    return res.status(200).json({ url: data.payment_url, id: data.payment_id });
  } catch (e) {
    return res.status(500).json({ error: "Error interno al crear el pago" });
  }
}
