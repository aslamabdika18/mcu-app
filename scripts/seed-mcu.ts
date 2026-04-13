import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"

dotenv.config({
  path: ".env.local"
})

// ======================
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  throw new Error("ENV belum diset")
}

const supabase = createClient(url, key)

// ======================
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)]
}

// ======================
const names = ["Budi","Andi","Rizky","Fajar","Dimas","Siti","Aisyah","Putri"]
const doctors = ["dr. Andi","dr. Sari","dr. Bima"]

function generateData(i: number) {
  const tekanan = rand(110, 150)
  const abnormal = tekanan > 135

  return {
    nik: `1201${rand(1000000000, 9999999999)}`,
    email: `user${i}@gmail.com`,
    ttl: "Medan, 1995-01-01",
    access_token: crypto.randomUUID(),
    added_by: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),

    data: {
      identitas: {
        nama: pick(names),
        jenisKelamin: "Laki-laki",
        ttl: "Medan, 1995-01-01",
        alamat: "Medan",
        noHp: "08123456789",
        agama: "Islam",
        bbTb: "70kg / 170cm",
        golDarah: "O",
      },

      tandaVital: {
        tekananDarah: `${tekanan}/80`,
        nadi: "70",
        respirasi: "20",
        suhu: "36.5",
      },

      pemeriksaanFisik: {
        kepala:{status:"Normal",keterangan:"-"},
        wajah:{status:"Normal",keterangan:"-"},
        mata:{status:"Normal",keterangan:"-"},
        thtKanan:{status:"Normal",keterangan:"-"},
        thtKiri:{status:"Normal",keterangan:"-"},
        tonsil:{status:"Normal",keterangan:"-"},
        thorax:{status:"Normal",keterangan:"-"},
        gigi:{status:"Normal",keterangan:"-"},
        thyroid:{status:"Normal",keterangan:"-"},
        jantung:{status:"Normal",keterangan:"-"},
        paru:{status:"Normal",keterangan:"-"},
        abdomen:{status:"Normal",keterangan:"-"},
        kulit:{status:"Normal",keterangan:"-"},
        perianal:{status:"Normal",keterangan:"-"},
        genitalia:{status:"Normal",keterangan:"-"},
        extremitasAtas:{status:"Normal",keterangan:"-"},
        extremitasBawah:{status:"Normal",keterangan:"-"},
      },

      kesimpulan: abnormal ? ["Perlu cek"] : ["Normal"],
      saran: abnormal ? ["Kontrol"] : ["Sehat"],
      doctorName: pick(doctors),
    },
  }
}

// ======================
async function seed() {
  const total = rand(10, 20)

  console.log("Generate:", total)

  const data = Array.from({ length: total }, (_, i) =>
    generateData(i)
  )

  console.log("ENV:", key ? "OK" : "KOSONG")

  const { data: inserted, error } = await supabase
    .from("mcu")
    .insert(data)
    .select()

  if (error) {
    console.error("ERROR:", error)
    return
  }

  console.log("SUCCESS:", inserted?.length)
}

seed()