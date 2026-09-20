export default function FondoOlas() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background: "#0E3B3A",
      overflow: "hidden",
    }}>
      {/* Foto de fondo (estetoscopio, relacionada con TuMed) */}
      <img
        src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1920"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.55,
          filter: "blur(6px) saturate(0.85)",
        }}
      />

      {/* Capa turquesa oscuro para difuminar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, rgba(14,59,58,0.55), rgba(14,59,58,0.85))",
      }} />

      {/* Olas en movimiento */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          opacity: 0.5,
        }}
      >
        <defs>
          <filter id="difuminado" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <g filter="url(#difuminado)">
          <path
            fill="#1F8A7A"
            fillOpacity="0.6"
            d="M0,160 C240,60 480,260 720,180 C960,100 1200,260 1440,160 L1440,320 L0,320 Z"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 80,0; 0,0"
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
          <path
            fill="#2BB3A0"
            fillOpacity="0.45"
            d="M0,220 C240,120 480,320 720,240 C960,160 1200,320 1440,220 L1440,320 L0,320 Z"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -80,0; 0,0"
              dur="16s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </div>
  );
}
