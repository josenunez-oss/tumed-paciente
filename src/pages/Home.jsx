import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import BannerDoctores from "../components/BannerDoctores.jsx";
import TopBar from "../components/TopBar.jsx";

export default function Home() {
  const [sesion, setSesion] = useState(false);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    async function verificar() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setSesion(true);
        const { data } = await supabase
          .from("pacientes")
          .select("nombre")
          .eq("email", user.email)
          .maybeSingle();
        if (data) setNombre(data.nombre || "");
      }
    }
    verificar();
  }, []);

  if (!sesion) {
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
        <div style={{ maxWidth: 600, width: "100%" }}>
          <h1 style={{ color: "#1F4D45", fontSize: 40, fontWeight: 700, marginBottom: 8 }}>
            Bienvenido/a a TuMed
          </h1>
          <p style={{ color: "#5B655F", fontSize: 18, marginBottom: 32 }}>
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

  const primerNombre = nombre ? nombre.split(" ")[0] : "";
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      background: "#EFF3EF",
      padding: 20,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 600, width: "100%" }}>
        <TopBar />

        <h1 style={{ color: "#1F4D45", fontSize: 40, fontWeight: 700, marginBottom: 8 }}>
          Bienvenido/a{primerNombre ? `, ${primerNombre}` : ""}
        </h1>
        <p style={{ color: "#5B655F", fontSize: 18, marginBottom: 32 }}>
          Encuentra a tu médico y agenda tu cita en minutos.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
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
        </div>
        <BannerDoctores />
      </div>
    </div>
  );
}
