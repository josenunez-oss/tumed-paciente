export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const body = req.body;

  if (body.notification_type !== "payment") {
    return res.status(200).json({ ok: true });
  }

  const apiVersion = body.api_version;
  const paymentId = body.payment_id;

  console.log("Notificación de pago recibida:", { apiVersion, paymentId });

  return res.status(200).json({ ok: true });
}
