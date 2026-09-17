import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ color: "#1F4D45" }}>TuMed</h1>
      <p>Encuentra a tu médico y agenda tu cita.</p>
      <Link to="/doctors">Ver médicos</Link>
      <Link to="/login" style={{ marginLeft: 12 }}>Iniciar sesión</Link>
    </div>
  );
}
