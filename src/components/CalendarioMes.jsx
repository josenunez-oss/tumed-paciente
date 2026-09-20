import { useState } from "react";

export default function CalendarioMes() {
  const [fecha] = useState(new Date());
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth();
  const diasSemana = ["L", "M", "X", "J", "V", "S", "D"];
  const nombresMes = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const primerDia = new Date(anio, mes, 1).getDay();
  const inicio = primerDia === 0 ? 6 : primerDia - 1;
  const totalDias = new Date(anio, mes + 1, 0).getDate();
  const hoy = fecha.getDate();

  const celdas = [];
  for (let i = 0; i < inicio; i++) celdas.push(null);
  for (let d = 1; d <= totalDias; d++) celdas.push(d);

  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: 16,
      border: "1px solid #DFE3DE",
      padding: 16,
      boxShadow: "0 2px 10px rgba(31,77,69,0.08)",
    }}>
      <div style={{ textAlign: "center", color: "#1F4D45", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
        {nombresMes[mes]} {anio}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 4 }}>
        {diasSemana.map((d, i) => (
          <div key={i} style={{ textAlign: "center", fontSize: 12, color: "#5B655F", fontWeight: 600 }}>
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {celdas.map((d, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontSize: 13,
              padding: "6px 0",
              borderRadius: 8,
              background: d === hoy ? "#1F4D45" : "transparent",
              color: d === hoy ? "#FFFFFF" : "#22282A",
              fontWeight: d === hoy ? 700 : 400,
            }}
          >
            {d ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
