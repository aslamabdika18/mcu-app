import { supabase } from "@/lib/supabase"
import { CreateMcuDTO } from "@/types/mcu"
import { McuRecord } from "@/types/mcu"

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

export async function updateMcu(
  id: string,
  dto: CreateMcuDTO
) {
  const { data, error } = await supabase
    .from("mcu")
    .update({
      nik: dto.nik,
      ttl: dto.ttl,
      email: dto.email,
      data: dto.data,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) throw new Error(error.message)

  return data
}

export async function getMcuById(id: string) {
  const { data, error } = await supabase
    .from("mcu")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null

  return data
}

export async function deleteMcu(id: string) {
  const { error } = await supabase
    .from("mcu")
    .delete()
    .eq("id", id)

  if (error) throw new Error(error.message)

  return true
}