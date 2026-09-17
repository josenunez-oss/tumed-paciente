import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#EFF3EF",
      padding: 20,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 600 }}>
        <h1 style={{ color: "#1F4D45", fontSize: 44, fontWeight: 700, marginBottom: 8 }}>
          TuMed
        </h1>
        <p style={{ color: "#5B655F", fontSize: 20, marginBottom: 32 }}>
          Encuentra a tu médico y agenda tu cita en minutos.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/doctors"
            style={{
              padding: "14px 28px",
              borderRadius: 8,
              background: "#1F4D45",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Ver médicos
          </Link>
          <Link
            to="/login"
            style={{
              padding: "14px 28px",
              borderRadius: 8,
              background: "#fff",
              color: "#1F4D45",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid #1F4D45",
            }}
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
