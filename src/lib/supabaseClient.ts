import { createClient } from '@supabase/supabase-js'

// For demo purposes, we'll use valid placeholder URLs
// In production, replace these with your actual Supabase credentials
const supabaseUrl = 'https://xyzcompany.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4ODUzNCwiZXhwIjoxOTU4ODY0NTM0fQ.demo-key-for-development'

// Create Supabase client (this is just for demo - won't actually connect)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface User {
  id: string
  email: string
  role: 'admin' | 'officer' | 'treasurer' | 'volunteer'
  full_name: string
  created_at: string
}

export interface Citation {
  id: string
  date: string
  time: string
  uniform_type: 'estructural' | 'rescate' | 'parada'
  target_type: 'group' | 'individual'
  target_ids: string[]
  created_by: string
  created_at: string
  responses?: CitationResponse[]
}

export interface CitationResponse {
  id: string
  citation_id: string
  user_id: string
  response: 'yes' | 'no' | 'pending'
  created_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  start_date: string
  end_date: string
  assigned_to: string[]
  created_by: string
  status: 'pending' | 'in_progress' | 'completed'
  created_at: string
}

export interface Shift {
  id: string
  date: string
  start_time: string
  end_time: string
  assigned_to: string[]
  shift_type: string
  created_by: string
  created_at: string
}

export interface Dues {
  id: string
  user_id: string
  month: string
  year: number
  paid: boolean
  amount: number
  paid_date?: string
  created_at: string
}

export interface Event {
  id: string
  title: string
  description?: string
  date: string
  start_time: string
  end_time?: string
  visible_to_all: boolean
  created_by: string
  participants?: string[]
  created_at: string
}
