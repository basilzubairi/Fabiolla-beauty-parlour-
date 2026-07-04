// Supabase backend adapter for Fabiolla Beauty
// 1. npm i @supabase/supabase-js
// 2. Create .env.local with:
//    NEXT_PUBLIC_SUPABASE_URL=your-url
//    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
// 3. SQL to create table:
// 
// create table public.appointments (
//   id text primary key,
//   date date not null,
//   time text not null,
//   service_id text not null,
//   service_name text not null,
//   duration int not null,
//   customer_name text not null,
//   customer_phone text not null,
//   customer_email text not null,
//   notes text,
//   status text default 'confirmed',
//   created_at timestamptz default now(),
//   unique(date, time)
// );
//
// Then replace bookingStore calls with supabaseBookingStore below.

/*
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const supabaseBookingStore = {
  async list() {
    const { data } = await supabase.from('appointments').select('*').order('date', { ascending: true })
    return data || []
  },
  async bookedTimes(date: string) {
    const { data } = await supabase.from('appointments').select('time').eq('date', date).neq('status','cancelled')
    return (data||[]).map(d=>d.time)
  },
  async create(appt: any) {
    const { data, error } = await supabase.from('appointments').insert(appt).select().single()
    if (error) throw error
    // trigger email via Supabase Edge Function / Resend
    return data
  }
}
*/

export {}
