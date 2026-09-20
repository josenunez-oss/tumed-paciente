import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import BannerDoctores from "../components/BannerDoctores.jsx";
import TopBar from "../components/TopBar.jsx";
import FechaActual from "../components/FechaActual.jsx";
import FondoOlas from "../components/FondoOlas.jsx";

const IconoPerfil = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#204C47" style={{ width: 44, height: 44 }}>
    <circle cx="50" cy="27.4" r="13.5"/>
    <rect x="26.9" y="43.9" width="46.2" height="42.4" rx="13"/>
  </svg>
);

const IconoBilletera = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#204C47" strokeWidth="1.6" strokeLinejoin="round" style={{ width: 44, height: 44 }}>
    <path d="M27 40 58.3 20.6 62.5 27.6 33 40z"/>
    <path d="M33 40 66.5 26 69.4 33.5 40 40z"/>
    <path d="M40 40 71 34 72.5 41 46 41z"/>
    <rect x="21.4" y="41.5" width="57.2" height="38.5" rx="5"/>
    <path d="M21.4 46.5a5 5 0 0 1 5-5h47" />
    <rect x="21.4" y="43.5" width="54" height="36.5" rx="4" fill="#204C47"/>
  </svg>
);

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
        <FondoOlas />
        <div style={{ maxWidth: 600, width: "100%" }}>
          <h1 style={{ color: "#FFFFFF", fontSize: 40, fontWeight: 700, marginBottom: 8 }}>
            Bienvenido/a a TuMed
          </h1>
          <p style={{ color: "#D6E8E5", fontSize: 18, marginBottom: 32 }}>
            Encuentra a tu médico y agenda tu cita en minutos.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/doctors"
              style={{
                padding: "14px 28px",
                borderRadius: 8,
                background: "#FFFFFF",
                color: "#1F4D45",
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
                background: "transparent",
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid #FFFFFF",
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
      <FondoOlas />
      <div style={{ maxWidth: 600, width: "100%" }}>
        <BannerDoctores />
        <TopBar />
        <h1 style={{ color: "#1F4D45", fontSize: 36, fontWeight: 700, margin: "16px 0 8px 0" }}>
          {primerNombre ? `Bienvenido/a, ${primerNombre}` : "Bienvenido/a a TuMed"}
        </h1>
        <p style={{ color: "#5B655F", fontSize: 18, marginBottom: 40 }}>
          Encuentra a tu médico y agenda tu cita en minutos.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/perfil"
            style={{
              width: 120,
              height: 120,
              borderRadius: 20,
              background: "#FFFFFF",
              border: "1px solid #DFE3DE",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(31,77,69,0.08)",
            }}
          >
            <IconoPerfil />
            <span style={{ fontSize: 15, fontWeight: 600, color: "#1F4D45", marginTop: 8, letterSpacing: 0.3 }}>
              Perfil
            </span>
          </Link>

          <Link
            to="/pagos"
            style={{
              width: 120,
              height: 120,
              borderRadius: 20,
              background: "#FFFFFF",
              border: "1px solid #DFE3DE",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(31,77,69,0.08)",
            }}
          >
            <IconoBilletera />
            <span style={{ fontSize: 15, fontWeight: 600, color: "#1F4D45", marginTop: 8, letterSpacing: 0.3 }}>
              Información de pago
            </span>
          </Link>

          <Link
            to="/mis-citas"
            style={{
              width: 120,
              height: 120,
              borderRadius: 20,
              background: "#FFFFFF",
              border: "1px solid #DFE3DE",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              boxShadow: "0 2px 10px rgba(31,77,69,0.08)",
            }}
          >
            <FechaActual />
            <span style={{ fontSize: 15, fontWeight: 600, color: "#1F4D45", marginTop: 8, letterSpacing: 0.3 }}>
              Citas
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
