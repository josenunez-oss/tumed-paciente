import { useState } from "react";
import { supabase } from "../lib/supabase.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);
    navigate("/login");
  }

  return (
    <form onSubmit={handleRegister} style={{ padding: 40, maxWidth: 400 }}>
      <h2>Registrarse</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Crear cuenta</button>
    </form>
  );
}
