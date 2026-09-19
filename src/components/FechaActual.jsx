import { useEffect, useState } from "react";

export default function FechaActual() {
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setFecha(new Date()), 60000);
    return () => clearInterval(intervalo);
  }, []);

  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const diaSemana = dias[fecha.getDay()];
  const diaMes = fecha.getDate();

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 13, color: "#1F4D45", fontWeight: 600 }}>
        {diaSemana}
      </div>
      <div style={{ fontSize: 26, color: "#1F4D45", fontWeight: 700, marginTop: 2 }}>
        {diaMes}
      </div>
    </div>
  );
}
