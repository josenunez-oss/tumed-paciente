-- Ejecutar en el SQL editor de Supabase para habilitar
-- la pantalla de "Información de pago" (src/pages/Pagos.jsx).
--
-- Por seguridad, esta tabla nunca guarda el número completo de
-- la tarjeta ni el CVV: solo la marca, los últimos 4 dígitos,
-- el titular y el vencimiento.

create table if not exists metodos_pago (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  titular text not null,
  marca text not null,
  ultimos4 text not null,
  vencimiento text not null,
  creado_en timestamptz not null default now()
);

alter table metodos_pago enable row level security;

create policy "Los pacientes ven sus propios metodos de pago"
  on metodos_pago for select
  using (email = auth.jwt() ->> 'email');

create policy "Los pacientes agregan sus propios metodos de pago"
  on metodos_pago for insert
  with check (email = auth.jwt() ->> 'email');

create policy "Los pacientes eliminan sus propios metodos de pago"
  on metodos_pago for delete
  using (email = auth.jwt() ->> 'email');
