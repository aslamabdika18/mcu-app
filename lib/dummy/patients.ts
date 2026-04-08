// lib/dummy/patients.ts

export type Patient = {
  id: string
  name: string
  nik: string
  birthDate: string
  mcuStatus: "none" | "draft" | "submitted" | "approved"
  qrCode: string
}

export const patients: Patient[] = [
  {
    id: "1",
    name: "Budi Santoso",
    nik: "1234567890",
    birthDate: "1990-01-01",
    mcuStatus: "none",
    qrCode: "qr123"
  },
  {
    id: "2",
    name: "Andi Wijaya",
    nik: "9876543210",
    birthDate: "1985-05-10",
    mcuStatus: "draft",
    qrCode: "qr456"
  },
  {
    id: "3",
    name: "Siti Rahma",
    nik: "1122334455",
    birthDate: "1992-07-21",
    mcuStatus: "approved",
    qrCode: "qr789"
  }
]