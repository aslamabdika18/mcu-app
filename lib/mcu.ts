// lib/mcu.ts
import { db } from "@/lib/db"
import { CreateMcuDTO } from "@/types/mcu"

export async function createMcu(dto: CreateMcuDTO) {
  return db.mcu.create({
    data: {
      nik: dto.nik,
      ttl: dto.ttl,
      email: dto.email,
      data: dto.data // fully typed sekarang
    }
  })
}