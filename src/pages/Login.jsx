import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import BannerDoctores from '../components/BannerDoctores.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Revisa si el correo pertenece a un doctor
    const { data: doctor } = await supabase.from('doctores').select('id').eq('email', email).maybeSingle()
    if (doctor) {
      navigate('/doctors')
      return
    }

    // Si no es doctor, es paciente
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-sage flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-serif text-brand text-center">TuMed</h1>
        <p className="text-center text-inkSoft mb-6">Tu salud, en tus manos</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-white rounded-lg p-3 font-semibold transition-all duration-200 hover:bg-brandDark hover:scale-[1.02] active:scale-95"
          >
            {loading ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-inkSoft">
          ¿Eres nuevo? <Link to="/register" className="text-accent font-semibold">Regístrate</Link>
        </p>
      </div>

      {/* Banner debajo del formulario */}
      <div className="w-full max-w-sm mt-6">
        <BannerDoctores />
      </div>
    </div>
  )
}
