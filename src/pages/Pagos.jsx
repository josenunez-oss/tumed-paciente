import { useNavigate } from "react-router-dom";

export default function Pagos() {
  const navigate = useNavigate();

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

        <div style={{
          background: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid #DFE3DE",
          padding: 32,
          textAlign: "center",
        }}>
          <p style={{ color: "#5B655F", fontSize: 16, margin: 0 }}>
            Aún no tienes métodos de pago guardados.
          </p>
        </div>
      </div>
    </div>
  );
}
