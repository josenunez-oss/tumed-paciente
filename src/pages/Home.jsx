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
      background: "#EFF3EF",
      padding: 20,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 600, width: "100%" }}>
        {/* Banner arriba del todo (ocultable) */}
        <BannerDoctores />

        {/* Flecha y EXIT */}
        <TopBar />

        {/* Saludo: con nombre o genérico */}
        <h1 style={{ color: "#1F4D45", fontSize: 36, fontWeight: 700, margin: "16px 0 8px 0" }}>
          {primerNombre ? `Bienvenido/a, ${primerNombre}` : "Bienvenido/a a TuMed"}
        </h1>
        <p style={{ color: "#5B655F", fontSize: 18, marginBottom: 40 }}>
          Encuentra a tu médico y agenda tu cita en minutos.
        </p>

        {/* Botones grandes en el centro */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/perfil"
            style={{
              width: 110,
              height: 110,
              borderRadius: 16,
              background: "#fff",
              border: "1px solid #DFE3DE",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <span style={{ fontSize: 44 }}>🚹</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1F4D45", marginTop: 6 }}>
              Perfil
            </span>
          </Link>

          <Link
            to="/pagos"
            style={{
              width: 110,
              height: 110,
              borderRadius: 16,
              background: "#fff",
              border: "1px solid #DFE3DE",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <span style={{ fontSize: 44 }}>👛</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1F4D45", marginTop: 6 }}>
              Información de pago
            </span>
          </Link>

          <Link
            to="/mis-citas"
            style={{
              width: 110,
              height: 110,
              borderRadius: 16,
              background: "#fff",
              border: "1px solid #DFE3DE",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <span style={{ fontSize: 44 }}>📅</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1F4D45", marginTop: 6 }}>
              Citas
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
