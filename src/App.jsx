import React, { useState } from "react";
import {
  MapPin, Search, Star, ShieldCheck, Clock, Calendar,
  ChevronLeft, X, Check, AlertCircle, Home, User, CalendarCheck, Eye,
  Phone, ShieldAlert, Siren, CreditCard
} from "lucide-react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Allura&display=swap');
`;

const serif = { fontFamily: "'Lora', Georgia, serif" };
const sans = { fontFamily: "'Inter', system-ui, sans-serif" };

const COLORS = {
  bg: "#EFF3EF",
  surface: "#FFFFFF",
  border: "#DFE3DE",
  brand: "#1F4D45",
  brandDark: "#153833",
  ink: "#22282A",
  inkSoft: "#5B655F",
  accent: "#C08A2E",
  accentSoft: "#F3E6CB",
  alert: "#B23A2E",
  alertSoft: "#F6E2DF",
  bienvenida: "#B5657A",
};

const ESPECIALIDADES = ["Todas", "Medicina general", "Pediatría", "Dermatología", "Cardiología"];

const DOCTORES = [
  {
    id: 1, nombre: "Marcela Ibáñez", especialidad: "Medicina general",
    calificacion: 4.9, resenas: 128, distancia: "1.2 km", precio: 35000,
    iniciales: "MI", color: "#1F4D45", experiencia: "12 años de experiencia",
  },
  {
    id: 2, nombre: "Felipe Suárez", especialidad: "Pediatría",
    calificacion: 4.8, resenas: 94, distancia: "2.0 km", precio: 40000,
    iniciales: "FS", color: "#8A5A2E", experiencia: "8 años de experiencia",
  },
  {
    id: 3, nombre: "Carolina Reyes", especialidad: "Dermatología",
    calificacion: 5.0, resenas: 61, distancia: "3.4 km", precio: 45000,
    iniciales: "CR", color: "#5B4A8A", experiencia: "15 años de experiencia",
  },
  {
    id: 4, nombre: "Andrés Molina", especialidad: "Cardiología",
    calificacion: 4.7, resenas: 143, distancia: "4.1 km", precio: 55000,
    iniciales: "AM", color: "#2E5D8A", experiencia: "20 años de experiencia",
  },
];

function VerifiedBadge({ compact }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5"
      style={{ background: COLORS.accentSoft, color: "#8A6A1E" }}
    >
      <ShieldCheck size={compact ? 12 : 14} strokeWidth={2.4} />
      <span style={{ ...sans, fontSize: compact ? 11 : 12, fontWeight: 600 }}>Verificado</span>
    </span>
  );
}

function Rating({ value, count }) {
  return (
    <span className="inline-flex items-center gap-1" style={{ ...sans, fontSize: 13, color: COLORS.inkSoft }}>
      <Star size={13} fill={COLORS.accent} stroke={COLORS.accent} />
      <span style={{ fontWeight: 600, color: COLORS.ink }}>{value}</span>
      <span>({count})</span>
    </span>
  );
}

function PrimaryButton({ children, onClick, disabled, danger }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl py-3 transition-opacity"
      style={{
        ...sans,
        background: disabled ? "#B7C4BF" : danger ? COLORS.alert : COLORS.brand,
        color: "#FFFFFF",
        fontWeight: 600,
        fontSize: 15,
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl py-3"
      style={{ ...sans, background: "transparent", border: `1px solid ${COLORS.border}`, color: COLORS.ink, fontWeight: 600, fontSize: 15 }}
    >
      {children}
    </button>
  );
}

function Screen({ children }) {
  return (
    <div className="h-full overflow-y-auto pb-24" style={{ background: COLORS.bg }}>
      {children}
    </div>
  );
}

function TopBar({ title, onBack }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-6 pb-3" style={{ background: COLORS.bg }}>
      {onBack && (
        <button onClick={onBack} className="p-1 -ml-1 rounded-full">
          <ChevronLeft size={22} color={COLORS.ink} />
        </button>
      )}
      <h1 style={{ ...serif, fontSize: 19, fontWeight: 600, color: COLORS.ink }}>{title}</h1>
    </div>
  );
}

function Wordmark({ size = 40 }) {
  return (
    <div className="flex items-baseline" style={{ lineHeight: 1 }}>
      <span style={{ fontFamily: "'Allura', cursive", color: COLORS.bienvenida, fontSize: size * 1.15 }}>Tu</span>
      <span style={{ ...serif, fontWeight: 700, color: COLORS.brand, fontSize: size * 0.62, marginLeft: 2 }}>Med</span>
    </div>
  );
}

function SplashScreen({ onDone }) {
  return (
    <Screen>
      <div className="flex flex-col items-center justify-between h-full px-8 pt-24 pb-12 text-center">
        <div className="flex flex-col items-center">
          <div
            className="rounded-3xl flex items-center justify-center"
            style={{ width: 84, height: 84, background: COLORS.brand }}
          >
            <span style={{ ...serif, color: "#FFF", fontSize: 32, fontWeight: 700 }}>T</span>
          </div>
          <div className="mt-6"><Wordmark size={44} /></div>
          <p style={{ ...sans, fontSize: 13.5, color: COLORS.inkSoft, marginTop: 10, maxWidth: 240, lineHeight: 1.5 }}>
            Médicos verificados, a la puerta de tu casa.
          </p>
        </div>
        <div className="w-full"><PrimaryButton onClick={onDone}>Comenzar</PrimaryButton></div>
      </div>
    </Screen>
  );
}

function OnboardingScreen({ onDone }) {
  const [direccion, setDireccion] = useState("");
  return (
    <Screen>
      <div className="flex flex-col justify-between h-full px-6 pt-16 pb-10">
        <div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8"
            style={{ background: COLORS.brand }}
          >
            <Home size={22} color="#FFFFFF" />
          </div>
          <h1 style={{ ...serif, fontSize: 28, fontWeight: 600, color: COLORS.ink, lineHeight: 1.25 }}>
            Un médico verificado,{"\n"}en tu puerta.
          </h1>
          <p style={{ ...sans, fontSize: 14, color: COLORS.inkSoft, marginTop: 10 }}>
            Para mostrarte los médicos disponibles cerca de ti, necesitamos tu dirección.
          </p>

          <div className="mt-8">
            <label style={{ ...sans, fontSize: 12, color: COLORS.inkSoft, fontWeight: 600 }}>
              Tu dirección
            </label>
            <div
              className="flex items-center gap-2 mt-2 rounded-xl px-3 py-3"
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
            >
              <MapPin size={17} color={COLORS.brand} />
              <input
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle, número, ciudad"
                style={{ ...sans, fontSize: 14, color: COLORS.ink, outline: "none", width: "100%", background: "transparent" }}
              />
            </div>
          </div>
        </div>

        <PrimaryButton onClick={onDone} disabled={direccion.trim().length < 4}>
          Continuar
        </PrimaryButton>
      </div>
    </Screen>
  );
}

function CatalogScreen({ onSelectDoctor }) {
  const [filtro, setFiltro] = useState("Todas");
  const lista = filtro === "Todas" ? DOCTORES : DOCTORES.filter((d) => d.especialidad === filtro);

  return (
    <Screen>
      <div className="px-5 pt-6 pb-2">
        <Wordmark size={22} />
        <div className="flex items-center gap-1.5 mt-3" style={{ color: COLORS.inkSoft }}>
          <MapPin size={13} />
          <span style={{ ...sans, fontSize: 12.5 }}>Av. Los Alerces 1234, tu dirección</span>
        </div>
        <h1 style={{ ...serif, fontSize: 24, fontWeight: 600, color: COLORS.ink, marginTop: 6 }}>
          Médicos cerca de ti
        </h1>

        <div
          className="flex items-center gap-2 mt-4 rounded-xl px-3 py-2.5"
          style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
        >
          <Search size={16} color={COLORS.inkSoft} />
          <span style={{ ...sans, fontSize: 13.5, color: COLORS.inkSoft }}>Buscar especialidad o médico</span>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {ESPECIALIDADES.map((esp) => (
            <button
              key={esp}
              onClick={() => setFiltro(esp)}
              className="rounded-full px-3.5 py-1.5 whitespace-nowrap flex-shrink-0"
              style={{
                ...sans,
                fontSize: 13,
                fontWeight: 600,
                background: filtro === esp ? COLORS.brand : COLORS.surface,
                color: filtro === esp ? "#FFFFFF" : COLORS.ink,
                border: `1px solid ${filtro === esp ? COLORS.brand : COLORS.border}`,
              }}
            >
              {esp}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-3 flex flex-col gap-3">
        {lista.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelectDoctor(doc)}
            className="flex items-center gap-3 rounded-2xl p-3 text-left"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: doc.color }}
            >
              <span style={{ ...serif, color: "#FFF", fontSize: 17, fontWeight: 600 }}>{doc.iniciales}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 style={{ ...serif, fontSize: 16, fontWeight: 600, color: COLORS.ink }}>{doc.nombre}</h3>
              </div>
              <p style={{ ...sans, fontSize: 12.5, color: COLORS.inkSoft, marginTop: 1 }}>{doc.especialidad}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Rating value={doc.calificacion} count={doc.resenas} />
                <span style={{ color: COLORS.border }}>·</span>
                <span style={{ ...sans, fontSize: 12.5, color: COLORS.inkSoft }}>{doc.distancia}</span>
              </div>
              <div className="mt-1.5"><VerifiedBadge compact /></div>
            </div>
          </button>
        ))}
      </div>
    </Screen>
  );
}

function DoctorProfileScreen({ doctor, onBack, onReservar }) {
  return (
    <Screen>
      <TopBar title="Perfil del médico" onBack={onBack} />
      <div className="px-5">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: doctor.color }}>
            <span style={{ ...serif, color: "#FFF", fontSize: 24, fontWeight: 600 }}>{doctor.iniciales}</span>
          </div>
          <div>
            <h2 style={{ ...serif, fontSize: 20, fontWeight: 600, color: COLORS.ink }}>{doctor.nombre}</h2>
            <p style={{ ...sans, fontSize: 13, color: COLORS.inkSoft }}>{doctor.especialidad} · {doctor.experiencia}</p>
            <div className="mt-1.5"><VerifiedBadge /></div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5 rounded-2xl p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="flex-1 text-center">
            <p style={{ ...serif, fontSize: 18, fontWeight: 600, color: COLORS.ink }}>{doctor.calificacion}</p>
            <p style={{ ...sans, fontSize: 11, color: COLORS.inkSoft }}>{doctor.resenas} reseñas</p>
          </div>
          <div className="w-px h-8" style={{ background: COLORS.border }} />
          <div className="flex-1 text-center">
            <p style={{ ...serif, fontSize: 18, fontWeight: 600, color: COLORS.ink }}>{doctor.distancia}</p>
            <p style={{ ...sans, fontSize: 11, color: COLORS.inkSoft }}>de distancia</p>
          </div>
          <div className="w-px h-8" style={{ background: COLORS.border }} />
          <div className="flex-1 text-center">
            <p style={{ ...serif, fontSize: 18, fontWeight: 600, color: COLORS.ink }}>${(doctor.precio / 1000).toFixed(0)}k</p>
            <p style={{ ...sans, fontSize: 11, color: COLORS.inkSoft }}>consulta</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 style={{ ...sans, fontSize: 13, fontWeight: 700, color: COLORS.ink }}>Documentación verificada</h3>
          <div className="flex flex-col gap-2 mt-2">
            {["Título universitario", "Colegiatura médica vigente", "Certificado de especialidad"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check size={15} color={COLORS.brand} />
                <span style={{ ...sans, fontSize: 13, color: COLORS.ink }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 style={{ ...sans, fontSize: 13, fontWeight: 700, color: COLORS.ink }}>Reseñas recientes</h3>
          <div className="mt-2 rounded-2xl p-3" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
            <div className="flex items-center gap-1 mb-1">
              <Star size={13} fill={COLORS.accent} stroke={COLORS.accent} />
              <Star size={13} fill={COLORS.accent} stroke={COLORS.accent} />
              <Star size={13} fill={COLORS.accent} stroke={COLORS.accent} />
              <Star size={13} fill={COLORS.accent} stroke={COLORS.accent} />
              <Star size={13} fill={COLORS.accent} stroke={COLORS.accent} />
            </div>
            <p style={{ ...sans, fontSize: 13, color: COLORS.ink }}>
              Llegó puntual, muy atenta y clara con las indicaciones.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <PrimaryButton onClick={onReservar}>Reservar cita</PrimaryButton>
      </div>
    </Screen>
  );
}

function BookingScreen({ doctor, onBack, onConfirmar, identidadVerificada, onAbrirVerificacion }) {
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [horaSeleccionada, setHoraSeleccionada] = useState("10:00");
  const horas = ["09:00", "10:00", "11:30", "16:00", "17:30"];
  const comision = Math.round(doctor.precio * 0.3);

  return (
    <Screen>
      <TopBar title="Reservar cita" onBack={onBack} />
      <div className="px-5">
        <div className="flex items-center gap-3 rounded-2xl p-3" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: doctor.color }}>
            <span style={{ ...serif, color: "#FFF", fontSize: 13, fontWeight: 600 }}>{doctor.iniciales}</span>
          </div>
          <div>
            <p style={{ ...serif, fontSize: 15, fontWeight: 600, color: COLORS.ink }}>{doctor.nombre}</p>
            <p style={{ ...sans, fontSize: 12, color: COLORS.inkSoft }}>{doctor.especialidad}</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <Calendar size={15} color={COLORS.brand} />
            <span style={{ ...sans, fontSize: 13, fontWeight: 600, color: COLORS.ink }}>Hoy, disponibilidad</span>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {horas.map((h) => (
              <button
                key={h}
                onClick={() => setHoraSeleccionada(h)}
                className="rounded-lg px-3.5 py-2"
                style={{
                  ...sans, fontSize: 13, fontWeight: 600,
                  background: horaSeleccionada === h ? COLORS.brand : COLORS.surface,
                  color: horaSeleccionada === h ? "#FFF" : COLORS.ink,
                  border: `1px solid ${horaSeleccionada === h ? COLORS.brand : COLORS.border}`,
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <MapPin size={15} color={COLORS.brand} />
          <span style={{ ...sans, fontSize: 13, color: COLORS.ink }}>Av. Los Alerces 1234, tu dirección</span>
        </div>

        <div className="mt-5 rounded-2xl p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="flex justify-between" style={{ ...sans, fontSize: 13, color: COLORS.inkSoft }}>
            <span>Consulta</span><span>${doctor.precio.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mt-1" style={{ ...sans, fontSize: 13, color: COLORS.inkSoft }}>
            <span>Comisión de plataforma (30%)</span><span>incluida</span>
          </div>
          <div className="w-full h-px my-2" style={{ background: COLORS.border }} />
          <div className="flex justify-between" style={{ ...sans, fontSize: 15, fontWeight: 700, color: COLORS.ink }}>
            <span>Total</span><span>${doctor.precio.toLocaleString()}</span>
          </div>
        </div>

        <div
          className="mt-4 rounded-2xl p-3 flex gap-2"
          style={{ background: COLORS.accentSoft }}
        >
          <AlertCircle size={16} color="#8A6A1E" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ ...sans, fontSize: 12, color: "#6B521A", lineHeight: 1.5 }}>
            El cobro se realiza solo cuando el médico acepta tu reserva. Una vez confirmado el código
            de finalización por el médico, tendrás 3 días para reportar cualquier problema. Pasado ese
            plazo, el pago se libera y no se puede solicitar reembolso.
          </p>
        </div>

        <label className="flex items-start gap-2 mt-4">
          <input type="checkbox" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} className="mt-0.5" />
          <span style={{ ...sans, fontSize: 12.5, color: COLORS.ink }}>
            He leído y acepto la política de cancelación, reembolsos y disputas.
          </span>
        </label>

        {!identidadVerificada && <VerificarIdentidadCard onVerificar={onAbrirVerificacion} />}
      </div>

      <div className="px-5 mt-6">
        <PrimaryButton disabled={!aceptaTerminos || !identidadVerificada} onClick={() => onConfirmar(horaSeleccionada)}>
          {identidadVerificada ? "Confirmar reserva" : "Verifica tu identidad para continuar"}
        </PrimaryButton>
      </div>
    </Screen>
  );
}

function AppointmentScreen({ doctor, hora, estado, onAvanzarDemo, onVerCodigo, codigoVisto, codigoVisibleAhora, onCerrarCodigo, onReportar }) {
  return (
    <Screen>
      <TopBar title="Mi cita" />
      <div className="px-5">
        <div className="flex items-center gap-3 rounded-2xl p-3" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: doctor.color }}>
            <span style={{ ...serif, color: "#FFF", fontSize: 13, fontWeight: 600 }}>{doctor.iniciales}</span>
          </div>
          <div>
            <p style={{ ...serif, fontSize: 15, fontWeight: 600, color: COLORS.ink }}>{doctor.nombre}</p>
            <p style={{ ...sans, fontSize: 12, color: COLORS.inkSoft }}>Hoy, {hora} · {doctor.especialidad}</p>
          </div>
        </div>

        {estado === "esperando" && (
          <div className="mt-5 rounded-2xl p-4 text-center" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
            <Clock size={22} color={COLORS.brand} style={{ margin: "0 auto" }} />
            <p style={{ ...serif, fontSize: 16, fontWeight: 600, color: COLORS.ink, marginTop: 8 }}>
              Esperando confirmación del médico
            </p>
            <p style={{ ...sans, fontSize: 12.5, color: COLORS.inkSoft, marginTop: 4 }}>
              Tiene hasta 7 días para aceptar. No se ha realizado ningún cobro.
            </p>
          </div>
        )}

        {estado === "confirmada" && (
          <>
            <div className="mt-5 rounded-2xl p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
              <div className="flex items-center gap-2">
                <Check size={16} color={COLORS.brand} />
                <p style={{ ...sans, fontSize: 13.5, fontWeight: 700, color: COLORS.ink }}>Cita confirmada — pago procesado</p>
              </div>
              <p style={{ ...sans, fontSize: 12, color: COLORS.inkSoft, marginTop: 6, lineHeight: 1.5 }}>
                Cuando el médico finalice la consulta, deberás decirle en voz alta tu código de
                confirmación. Tendrás 3 días desde ese momento para reportar cualquier problema.
              </p>
            </div>

            {!codigoVisto ? (
              <button
                onClick={onVerCodigo}
                className="w-full mt-4 rounded-2xl p-4 flex items-center justify-between"
                style={{ background: COLORS.brandDark }}
              >
                <span style={{ ...sans, fontSize: 14, fontWeight: 600, color: "#FFF" }}>Ver mi código de confirmación</span>
                <Eye size={17} color="#FFF" />
              </button>
            ) : (
              <div className="mt-4 rounded-2xl p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
                <p style={{ ...sans, fontSize: 12, color: COLORS.inkSoft }}>Código de confirmación</p>
                <p style={{ ...serif, fontSize: 22, fontWeight: 700, color: COLORS.ink, letterSpacing: 2, marginTop: 4 }}>
                  •••• - ••••
                </p>
                <p style={{ ...sans, fontSize: 11.5, color: COLORS.inkSoft, marginTop: 6 }}>
                  Ya lo viste una vez y no se puede volver a mostrar.
                </p>
                <button style={{ ...sans, fontSize: 12.5, color: COLORS.brand, fontWeight: 600, marginTop: 8 }}>
                  ¿Perdiste tu código? Contactar a soporte
                </button>
              </div>
            )}

            <div className="mt-6 rounded-2xl p-3 border border-dashed" style={{ borderColor: COLORS.border }}>
              <p style={{ ...sans, fontSize: 11, color: COLORS.inkSoft, marginBottom: 8 }}>Panel de simulación (solo demo)</p>
              <SecondaryButton onClick={() => onAvanzarDemo("realizada")}>Simular: consulta finalizada por el médico</SecondaryButton>
            </div>
          </>
        )}

        {estado === "realizada" && (
          <>
            <div className="mt-5 rounded-2xl p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
              <p style={{ ...sans, fontSize: 13.5, fontWeight: 700, color: COLORS.ink }}>Consulta realizada</p>
              <p style={{ ...sans, fontSize: 12, color: COLORS.inkSoft, marginTop: 4 }}>
                Periodo de revisión: 3 días para reportar cualquier problema. Pasado ese plazo, el pago
                se libera automáticamente al médico.
              </p>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <SecondaryButton onClick={onReportar}>Reportar un problema</SecondaryButton>
            </div>
          </>
        )}

        {estado === "codigo-visible" && codigoVisibleAhora && (
          <CodeModal onClose={onCerrarCodigo} />
        )}
      </div>
    </Screen>
  );
}

function CodeModal({ onClose }) {
  const [confirmando, setConfirmando] = useState(true);

  if (confirmando) {
    return (
      <div className="fixed inset-0 flex items-end justify-center z-50" style={{ background: "rgba(20,24,22,0.5)" }}>
        <div className="w-full max-w-sm rounded-t-3xl p-6" style={{ background: COLORS.surface }}>
          <AlertCircle size={22} color={COLORS.alert} />
          <h3 style={{ ...serif, fontSize: 17, fontWeight: 600, color: COLORS.ink, marginTop: 10 }}>
            Este código se mostrará solo una vez
          </h3>
          <p style={{ ...sans, fontSize: 13, color: COLORS.inkSoft, marginTop: 6, lineHeight: 1.5 }}>
            Solo tú debes conocerlo. Nunca se lo entregues al médico por chat ni por escrito —
            díselo de viva voz únicamente al finalizar la consulta.
          </p>
          <div className="flex gap-2 mt-5">
            <div className="flex-1"><SecondaryButton onClick={onClose}>Cancelar</SecondaryButton></div>
            <div className="flex-1"><PrimaryButton onClick={() => setConfirmando(false)}>Sí, mostrar código</PrimaryButton></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50" style={{ background: "rgba(20,24,22,0.5)" }}>
      <div className="w-full max-w-sm rounded-t-3xl p-6 text-center" style={{ background: COLORS.surface }}>
        <p style={{ ...sans, fontSize: 12, color: COLORS.inkSoft }}>Tu código de confirmación</p>
        <p style={{ ...serif, fontSize: 32, fontWeight: 700, color: COLORS.brandDark, letterSpacing: 3, marginTop: 8 }}>
          7K3M-9QRT
        </p>
        <p style={{ ...sans, fontSize: 12, color: COLORS.inkSoft, marginTop: 10, lineHeight: 1.5 }}>
          Dilo en voz alta al médico solo al finalizar la consulta.
        </p>
        <div className="mt-6"><PrimaryButton onClick={onClose}>Listo, ya lo anoté</PrimaryButton></div>
      </div>
    </div>
  );
}

function ReportarProblemaScreen({ onBack, onEnviar }) {
  const [motivo, setMotivo] = useState(null);
  const motivos = ["El médico no llegó", "Llegó muy tarde", "No se prestó el servicio", "Otro"];

  return (
    <Screen>
      <TopBar title="Reportar un problema" onBack={onBack} />
      <div className="px-5">
        <p style={{ ...sans, fontSize: 13, color: COLORS.inkSoft }}>Selecciona el motivo</p>
        <div className="flex flex-col gap-2 mt-3">
          {motivos.map((m) => (
            <button
              key={m}
              onClick={() => setMotivo(m)}
              className="text-left rounded-xl p-3"
              style={{
                ...sans, fontSize: 13.5,
                background: motivo === m ? COLORS.accentSoft : COLORS.surface,
                border: `1px solid ${motivo === m ? COLORS.accent : COLORS.border}`,
                color: COLORS.ink,
              }}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <label style={{ ...sans, fontSize: 12, color: COLORS.inkSoft, fontWeight: 600 }}>Cuéntanos qué pasó</label>
          <textarea
            rows={4}
            placeholder="Describe la situación con el mayor detalle posible"
            className="w-full mt-2 rounded-xl p-3"
            style={{ ...sans, fontSize: 13, background: COLORS.surface, border: `1px solid ${COLORS.border}`, outline: "none" }}
          />
        </div>
      </div>
      <div className="px-5 mt-6">
        <PrimaryButton disabled={!motivo} onClick={onEnviar} danger>Enviar reporte</PrimaryButton>
      </div>
    </Screen>
  );
}

function ReporteEnviadoScreen({ onVolver }) {
  return (
    <Screen>
      <div className="flex flex-col items-center justify-center h-full px-8 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: COLORS.alertSoft }}>
          <AlertCircle size={26} color={COLORS.alert} />
        </div>
        <h2 style={{ ...serif, fontSize: 19, fontWeight: 600, color: COLORS.ink, marginTop: 16 }}>
          Tu pago fue congelado
        </h2>
        <p style={{ ...sans, fontSize: 13.5, color: COLORS.inkSoft, marginTop: 8, lineHeight: 1.6 }}>
          Estamos revisando tu caso. Te contactaremos en las próximas 48 horas con una resolución.
        </p>
        <div className="w-full mt-8"><SecondaryButton onClick={onVolver}>Volver al inicio</SecondaryButton></div>
      </div>
    </Screen>
  );
}

function BottomNav({ activo }) {
  const items = [
    { id: "catalog", label: "Catálogo", icon: Home },
    { id: "appointment", label: "Mis citas", icon: CalendarCheck },
    { id: "profile", label: "Perfil", icon: User },
  ];
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex justify-around py-2.5"
      style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.border}`, maxWidth: 420, margin: "0 auto" }}
    >
      {items.map(({ id, label, icon: Icon }) => (
        <div key={id} className="flex flex-col items-center gap-1">
          <Icon size={19} color={activo === id ? COLORS.brand : COLORS.inkSoft} />
          <span style={{ ...sans, fontSize: 10.5, fontWeight: 600, color: activo === id ? COLORS.brand : COLORS.inkSoft }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SosButton({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="fixed z-40 flex items-center gap-1.5 rounded-full px-3.5 py-2.5 shadow-none"
      style={{ background: COLORS.alert, right: 16, bottom: 100, maxWidth: 420 }}
    >
      <Siren size={16} color="#FFF" />
      <span style={{ ...sans, fontSize: 12.5, fontWeight: 700, color: "#FFF" }}>SOS</span>
    </button>
  );
}

function SosModal({ onClose }) {
  const [alertaEnviada, setAlertaEnviada] = useState(false);

  if (alertaEnviada) {
    return (
      <div className="fixed inset-0 flex items-end justify-center z-50" style={{ background: "rgba(20,24,22,0.55)" }}>
        <div className="w-full max-w-sm rounded-t-3xl p-6 text-center" style={{ background: COLORS.surface }}>
          <ShieldAlert size={26} color={COLORS.alert} style={{ margin: "0 auto" }} />
          <h3 style={{ ...serif, fontSize: 17, fontWeight: 600, color: COLORS.ink, marginTop: 10 }}>
            Soporte fue alertado
          </h3>
          <p style={{ ...sans, fontSize: 13, color: COLORS.inkSoft, marginTop: 6, lineHeight: 1.5 }}>
            Compartimos tu ubicación y los datos de tu cita con nuestro equipo. Si estás en peligro
            inmediato, no esperes: llama directamente a Carabineros o Ambulancia.
          </p>
          <div className="mt-5"><PrimaryButton onClick={onClose}>Cerrar</PrimaryButton></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50" style={{ background: "rgba(20,24,22,0.55)" }}>
      <div className="w-full max-w-sm rounded-t-3xl p-6" style={{ background: COLORS.surface }}>
        <h3 style={{ ...serif, fontSize: 18, fontWeight: 600, color: COLORS.ink }}>¿Necesitas ayuda ahora?</h3>
        <div className="flex flex-col gap-2 mt-4">
          <a href="tel:133" className="flex items-center gap-3 rounded-xl p-3" style={{ background: COLORS.alertSoft }}>
            <Phone size={17} color={COLORS.alert} />
            <span style={{ ...sans, fontSize: 13.5, fontWeight: 600, color: "#7A2E24" }}>Llamar a Carabineros (133)</span>
          </a>
          <a href="tel:131" className="flex items-center gap-3 rounded-xl p-3" style={{ background: COLORS.alertSoft }}>
            <Phone size={17} color={COLORS.alert} />
            <span style={{ ...sans, fontSize: 13.5, fontWeight: 600, color: "#7A2E24" }}>Llamar a Ambulancia (131)</span>
          </a>
          <button onClick={() => setAlertaEnviada(true)} className="flex items-center gap-3 rounded-xl p-3" style={{ background: COLORS.accentSoft }}>
            <ShieldAlert size={17} color="#8A6A1E" />
            <span style={{ ...sans, fontSize: 13.5, fontWeight: 600, color: "#6B521A" }}>Alertar a soporte de la app</span>
          </button>
        </div>
        <div className="mt-4"><SecondaryButton onClick={onClose}>Cancelar, fue un error</SecondaryButton></div>
      </div>
    </div>
  );
}

function VerificarIdentidadCard({ onVerificar }) {
  return (
    <div className="mt-4 rounded-2xl p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
      <div className="flex items-center gap-2">
        <CreditCard size={17} color={COLORS.brand} />
        <p style={{ ...sans, fontSize: 13.5, fontWeight: 700, color: COLORS.ink }}>Verifica tu identidad</p>
      </div>
      <p style={{ ...sans, fontSize: 12, color: COLORS.inkSoft, marginTop: 6, lineHeight: 1.5 }}>
        Antes de tu primera reserva, necesitamos confirmar tu identidad con una foto de tu cédula
        y una selfie. Esto protege también al médico que llegará a tu domicilio.
      </p>
      <div className="mt-3"><SecondaryButton onClick={onVerificar}>Verificar mi identidad</SecondaryButton></div>
    </div>
  );
}

function VerificacionIdentidadModal({ onCompletar, onClose }) {
  const [paso, setPaso] = useState("cedula");
  return (
    <div className="fixed inset-0 flex items-end justify-center z-50" style={{ background: "rgba(20,24,22,0.55)" }}>
      <div className="w-full max-w-sm rounded-t-3xl p-6" style={{ background: COLORS.surface }}>
        {paso === "cedula" && (
          <>
            <h3 style={{ ...serif, fontSize: 17, fontWeight: 600, color: COLORS.ink }}>Sube tu cédula de identidad</h3>
            <button
              onClick={() => setPaso("selfie")}
              className="w-full mt-4 rounded-xl p-6 flex flex-col items-center gap-2"
              style={{ border: `1.5px dashed ${COLORS.border}` }}
            >
              <CreditCard size={22} color={COLORS.inkSoft} />
              <span style={{ ...sans, fontSize: 12.5, color: COLORS.inkSoft }}>Toca para tomar una foto</span>
            </button>
          </>
        )}
        {paso === "selfie" && (
          <>
            <h3 style={{ ...serif, fontSize: 17, fontWeight: 600, color: COLORS.ink }}>Ahora, una selfie</h3>
            <p style={{ ...sans, fontSize: 12.5, color: COLORS.inkSoft, marginTop: 4 }}>
              La usamos solo para confirmar que la cédula es tuya.
            </p>
            <div className="mt-5"><PrimaryButton onClick={onCompletar}>Enviar y verificar</PrimaryButton></div>
            <div className="mt-2"><SecondaryButton onClick={onClose}>Cancelar</SecondaryButton></div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AppPaciente() {
  const [route, setRoute] = useState("splash");
  const [doctor, setDoctor] = useState(null);
  const [hora, setHora] = useState(null);
  const [estadoCita, setEstadoCita] = useState("esperando");
  const [codigoVisto, setCodigoVisto] = useState(false);
  const [codigoVisibleAhora, setCodigoVisibleAhora] = useState(false);
  const [identidadVerificada, setIdentidadVerificada] = useState(false);
  const [mostrarVerificacion, setMostrarVerificacion] = useState(false);
  const [mostrarSos, setMostrarSos] = useState(false);

  const showNav = ["catalog", "appointment", "profileTab"].includes(route);
  const citaActiva = route === "appointment" && (estadoCita === "confirmada" || estadoCita === "realizada");

  return (
    <div className="w-full max-w-sm mx-auto h-[820px] relative overflow-hidden" style={{ background: COLORS.bg, borderRadius: 28, border: `1px solid ${COLORS.border}` }}>
      <style>{FONTS}</style>

      {route === "splash" && <SplashScreen onDone={() => setRoute("onboarding")} />}

      {route === "onboarding" && <OnboardingScreen onDone={() => setRoute("catalog")} />}

      {route === "catalog" && (
        <CatalogScreen onSelectDoctor={(d) => { setDoctor(d); setRoute("profile"); }} />
      )}

      {route === "profile" && (
        <DoctorProfileScreen doctor={doctor} onBack={() => setRoute("catalog")} onReservar={() => setRoute("booking")} />
      )}

      {route === "booking" && (
        <BookingScreen
          doctor={doctor}
          onBack={() => setRoute("profile")}
          onConfirmar={(h) => { setHora(h); setEstadoCita("esperando"); setRoute("appointment"); }}
          identidadVerificada={identidadVerificada}
          onAbrirVerificacion={() => setMostrarVerificacion(true)}
        />
      )}

      {route === "appointment" && (
        <AppointmentScreen
          doctor={doctor}
          hora={hora}
          estado={estadoCita}
          codigoVisto={codigoVisto}
          codigoVisibleAhora={codigoVisibleAhora}
          onAvanzarDemo={(nuevo) => setEstadoCita(nuevo)}
          onVerCodigo={() => setCodigoVisibleAhora(true)}
          onCerrarCodigo={() => { setCodigoVisibleAhora(false); setCodigoVisto(true); setEstadoCita((prev) => (prev === "confirmada" ? "confirmada" : prev)); }}
          onReportar={() => setRoute("reportar")}
        />
      )}

      {route === "reportar" && (
        <ReportarProblemaScreen onBack={() => setRoute("appointment")} onEnviar={() => setRoute("reporteEnviado")} />
      )}

      {route === "reporteEnviado" && (
        <ReporteEnviadoScreen onVolver={() => setRoute("catalog")} />
      )}

      {route === "appointment" && estadoCita === "esperando" && (
        <div className="fixed px-5" style={{ bottom: 90, maxWidth: 420, width: "100%", left: "50%", transform: "translateX(-50%)" }}>
          <div className="rounded-2xl p-3 border border-dashed" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
            <p style={{ ...sans, fontSize: 11, color: COLORS.inkSoft, marginBottom: 8 }}>Panel de simulación (solo demo)</p>
            <SecondaryButton onClick={() => setEstadoCita("confirmada")}>Simular: el médico aceptó la cita</SecondaryButton>
          </div>
        </div>
      )}

      {mostrarVerificacion && (
        <VerificacionIdentidadModal
          onClose={() => setMostrarVerificacion(false)}
          onCompletar={() => { setIdentidadVerificada(true); setMostrarVerificacion(false); }}
        />
      )}

      {citaActiva && !mostrarSos && <SosButton onOpen={() => setMostrarSos(true)} />}
      {mostrarSos && <SosModal onClose={() => setMostrarSos(false)} />}

      {showNav && route !== "reportar" && route !== "reporteEnviado" && (
        <BottomNav activo={route === "profile" ? "catalog" : route} />
      )}
    </div>
  );
}
