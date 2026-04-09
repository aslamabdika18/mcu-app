import { supabase } from "@/lib/supabase"
import { CreateMcuDTO, MCUData } from "@/types/mcu"

export interface McuRecord {
  id: string
  nik: string
  email: string
  ttl: string
  data: MCUData
  access_token: string
  added_by: string | null
  created_at: string
}

function generateToken() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).substring(2)
}

// ✅ CREATE
export async function createMcu(dto: CreateMcuDTO): Promise<McuRecord> {
  const token = generateToken()

  const { data, error } = await supabase
    .from("mcu")
    .insert([
      {
        nik: dto.nik,
        ttl: dto.ttl,
        email: dto.email,
        data: dto.data,
        access_token: token,
        added_by: "admin",
      },
    ])
    .select()
    .single()

  if (error || !data) {
    throw new Error(error?.message || "Failed to create MCU")
  }

  return data as McuRecord
}

// ✅ GET BY TOKEN
export async function getMcuByToken(
  token: string
): Promise<McuRecord | null> {
  const { data, error } = await supabase
    .from("mcu")
    .select("*")
    .eq("access_token", token)
    .single()

  if (error) return null

  return data as McuRecord
}