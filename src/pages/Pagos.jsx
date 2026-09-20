import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";

function limpiarNumero(valor) {
  return valor.replace(/\D/g, "");
}

function formatearNumero(valor) {
  return limpiarNumero(valor).slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

function formatearVencimiento(valor) {
  const digitos = limpiarNumero(valor).slice(0, 4);
  if (digitos.length <= 2) return digitos;
  return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
}

function detectarMarca(numero) {
  if (/^4/.test(numero)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(numero)) return "Mastercard";
  if (/^3[47]/.test(numero)) return "American Express";
  return "Tarjeta";
}

function luhnValido(numero) {
  let suma = 0;
  let alternar = false;
  for (let i = numero.length - 1; i >= 0; i--) {
    let n = parseInt(numero[i], 10);
    if (alternar) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    suma += n;
    alternar = !alternar;
  }
  return suma % 10 === 0;
}

function vencimientoValido(valor) {
  const match = /^(\d{2})\/(\d{2})$/.exec(valor);
  if (!match) return false;
  const mes = parseInt(match[1], 10);
  if (mes < 1 || mes > 12) return false;
  const anio = 2000 + parseInt(match[2], 10);
  const finDeMes = new Date(anio, mes, 0, 23, 59, 59);
  return finDeMes >= new Date();
}

export default function Pagos() {
  const navigate = useNavigate();
  const [metodos, setMetodos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const [titular, setTitular] = useState("");
  const [numero, setNumero] = useState("");
  const [vencimiento, setVencimiento] = useState("");

  useEffect(() => {
    async function cargar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCargando(false);
        return;
      }
      const { data } = await supabase
        .from("metodos_pago")
        .select("*")
        .eq("email", user.email)
        .order("creado_en", { ascending: false });
      setMetodos(data || []);
      setCargando(false);
    }
    cargar();
  }, []);

  function cancelar() {
    setMostrarForm(false);
    setError("");
    setTitular("");
    setNumero("");
    setVencimiento("");
  }

  async function agregarMetodo(e) {
    e.preventDefault();
    setError("");

    const numeroLimpio = limpiarNumero(numero);

    if (!titular.trim()) {
      setError("Ingresa el nombre del titular");
      return;
    }
    if (numeroLimpio.length < 13 || numeroLimpio.length > 19 || !luhnValido(numeroLimpio)) {
      setError("El número de tarjeta no es válido");
      return;
    }
    if (!vencimientoValido(vencimiento)) {
      setError("La fecha de vencimiento no es válida o ya expiró");
      return;
    }

    setGuardando(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setGuardando(false);
      return;
    }

    const { data, error: dbError } = await supabase
      .from("metodos_pago")
      .insert({
        email: user.email,
        titular: titular.trim(),
        marca: detectarMarca(numeroLimpio),
        ultimos4: numeroLimpio.slice(-4),
        vencimiento,
      })
      .select()
      .single();

    setGuardando(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    setMetodos((prev) => [data, ...prev]);
    cancelar();
  }

  async function eliminarMetodo(id) {
    const { error: dbError } = await supabase.from("metodos_pago").delete().eq("id", id);
    if (!dbError) {
      setMetodos((prev) => prev.filter((m) => m.id !== id));
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#EFF3EF",
      padding: 20,
    }}>
      <div style={{ maxWidth: 600, width: "100%" }}>
        <button
          onClick={() => navigate('/')}
          title="Volver"
          style={{
            background: "transparent",
            border: "none",
            fontSize: 28,
            cursor: "pointer",
            color: "#1F4D45",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          ←
        </button>

        <h1 style={{ color: "#1F4D45", fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
          Información de pago
        </h1>
        <p style={{ color: "#5B655F", fontSize: 15, marginBottom: 32 }}>
          Gestiona tus métodos de pago para las consultas.
        </p>

        {cargando ? (
          <p style={{ color: "#5B655F" }}>Cargando...</p>
        ) : (
          <>
            {metodos.length === 0 && !mostrarForm && (
              <div style={{
                background: "#FFFFFF",
                borderRadius: 16,
                border: "1px solid #DFE3DE",
                padding: 32,
                textAlign: "center",
                marginBottom: 20,
              }}>
                <p style={{ color: "#5B655F", fontSize: 16, margin: 0 }}>
                  Aún no tienes métodos de pago guardados.
                </p>
              </div>
            )}

            {metodos.map((m) => (
              <div key={m.id} style={{
                background: "#FFFFFF",
                borderRadius: 16,
                border: "1px solid #DFE3DE",
                padding: "18px 20px",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div style={{ textAlign: "left" }}>
                  <p style={{ margin: 0, fontWeight: 600, color: "#1F4D45", fontSize: 16 }}>
                    {m.marca} •••• {m.ultimos4}
                  </p>
                  <p style={{ margin: "4px 0 0 0", color: "#5B655F", fontSize: 14 }}>
                    {m.titular} · Vence {m.vencimiento}
                  </p>
                </div>
                <button
                  onClick={() => eliminarMetodo(m.id)}
                  title="Eliminar"
                  style={{
                    background: "transparent",
                    border: "1px solid #DFE3DE",
                    borderRadius: 8,
                    padding: "6px 10px",
                    color: "#B5564B",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))}

            {mostrarForm ? (
              <form onSubmit={agregarMetodo} style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                marginTop: 12,
              }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#1F4D45", marginBottom: 6 }}>
                  Nombre del titular
                </label>
                <input
                  type="text"
                  value={titular}
                  onChange={(e) => setTitular(e.target.value)}
                  placeholder="Como aparece en la tarjeta"
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #DFE3DE",
                    fontSize: 16,
                    marginBottom: 16,
                    boxSizing: "border-box",
                  }}
                />

                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#1F4D45", marginBottom: 6 }}>
                  Número de tarjeta
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={numero}
                  onChange={(e) => setNumero(formatearNumero(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #DFE3DE",
                    fontSize: 16,
                    marginBottom: 16,
                    boxSizing: "border-box",
                  }}
                />

                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#1F4D45", marginBottom: 6 }}>
                  Vencimiento (MM/AA)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={vencimiento}
                  onChange={(e) => setVencimiento(formatearVencimiento(e.target.value))}
                  placeholder="MM/AA"
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #DFE3DE",
                    fontSize: 16,
                    marginBottom: 8,
                    boxSizing: "border-box",
                  }}
                />
                <p style={{ color: "#8A938C", fontSize: 12, marginTop: 0, marginBottom: 16 }}>
                  Por seguridad no guardamos el código de seguridad (CVV) ni el número completo de tu tarjeta.
                </p>

                {error && <p style={{ color: "#C0392B", fontSize: 14, marginTop: 0 }}>{error}</p>}

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    onClick={cancelar}
                    style={{
                      flex: 1,
                      padding: 14,
                      borderRadius: 8,
                      background: "transparent",
                      color: "#1F4D45",
                      fontSize: 16,
                      fontWeight: 600,
                      border: "1px solid #DFE3DE",
                      cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={guardando}
                    style={{
                      flex: 1,
                      padding: 14,
                      borderRadius: 8,
                      background: "#1F4D45",
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: 600,
                      border: "none",
                      cursor: guardando ? "default" : "pointer",
                      opacity: guardando ? 0.7 : 1,
                    }}
                  >
                    {guardando ? "Guardando..." : "Guardar tarjeta"}
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setMostrarForm(true)}
                style={{
                  width: "100%",
                  padding: 14,
                  borderRadius: 8,
                  background: "#1F4D45",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  marginTop: 4,
                }}
              >
                + Agregar método de pago
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
