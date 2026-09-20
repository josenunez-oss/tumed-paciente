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
      {/* Fondo turquesa abstracto (en código, no requiere subir archivo) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 794 553"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <filter id="b" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="45"/>
          </filter>
          <clipPath id="c"><rect width="794" height="553"/></clipPath>
        </defs>
        <g clipPath="url(#c)">
          <rect width="794" height="553" fill="#33999b"/>
          <g filter="url(#b)">
            <ellipse cx="270" cy="230" rx="110" ry="70" fill="#3fadaa"/>
            <ellipse cx="640" cy="260" rx="70" ry="150" fill="#42b2ae"/>
            <ellipse cx="330" cy="20" rx="120" ry="50" fill="#3fada9"/>
            <ellipse cx="600" cy="420" rx="120" ry="80" fill="#3aa8a6"/>
            <ellipse cx="40" cy="120" rx="90" ry="150" fill="#0d5a63"/>
            <ellipse cx="405" cy="130" rx="60" ry="45" fill="#106f78"/>
            <ellipse cx="470" cy="260" rx="70" ry="45" fill="#0c5d68"/>
            <ellipse cx="340" cy="320" rx="90" ry="25" fill="#0e6670"/>
            <ellipse cx="0" cy="330" rx="40" ry="60" fill="#0a5560"/>
            <ellipse cx="170" cy="470" rx="70" ry="50" fill="#06434c"/>
            <ellipse cx="330" cy="550" rx="90" ry="30" fill="#042f38"/>
          </g>
        </g>
      </svg>

      {/* Capa turquesa oscuro para difuminar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, rgba(14,59,58,0.35), rgba(14,59,58,0.6))",
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
