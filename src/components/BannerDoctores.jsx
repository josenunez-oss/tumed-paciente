export default function BannerDoctores() {
  return (
    <a
      href="https://tumed-doctores-aco6axszu-tu-med.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
    >
      <div
        className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105 transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/7653084/pexels-photo-7653084.jpeg?auto=compress&cs=tinysrgb&w=1200')" }}
      />
      <div className="absolute inset-0 bg-brand/60 transition-colors duration-300 group-hover:bg-brand/40" />
      <div className="relative p-6 text-white">
        <h3 className="text-2xl font-serif font-semibold">¿Eres médico?</h3>
        <p className="mt-1 text-white/90">Regístrate en la web de doctores y comienza a atender consultas.</p>
        <span className="inline-block mt-4 bg-accent text-white rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/80">
          Ir a la web de doctores →
        </span>
      </div>
    </a>
  ))))
}}}}}}
