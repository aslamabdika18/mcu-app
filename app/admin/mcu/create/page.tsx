"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createMcu } from "@/lib/mcu"
import { CreateMcuDTO, MCUData } from "@/types/mcu"
import { McuForm } from "@/components/admin/mcu-form"

// ======================
const pemeriksaanKeys: (keyof MCUData["pemeriksaanFisik"])[] = [
  "kepala","wajah","mata","thtKanan","thtKiri","tonsil","thorax",
  "gigi","thyroid","jantung","paru","abdomen","kulit",
  "perianal","genitalia","extremitasAtas","extremitasBawah"
]

// ======================
const defaultData: MCUData = {
  identitas: {
    nama: "-",
    jenisKelamin: "Laki-laki",
    ttl: "-",
    alamat: "-",
    noHp: "-",
    agama: "Islam",
    bbTb: "-",
    golDarah: "-"
  },
  tandaVital: {
    tekananDarah: "120/80",
    nadi: "70",
    respirasi: "20",
    suhu: "36.5"
  },
  pemeriksaanFisik: Object.fromEntries(
    pemeriksaanKeys.map(k => [k, { status: "Normal", keterangan: "-" }])
  ) as MCUData["pemeriksaanFisik"],
  kesimpulan: ["Normal"],
  saran: ["-"],
  doctorName: ""
}

// ======================
export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async ({
    data,
    nik,
    email,
  }: {
    data: MCUData
    nik: string
    email: string
  }) => {

    if (!nik || !email) {
      toast.error("NIK dan Email wajib diisi")
      return
    }

    setLoading(true)

    try {
      const dto: CreateMcuDTO = {
        nik,
        email,
        ttl: data.identitas.ttl,
        data,
      }

      // 🔥 FIX UTAMA
      await createMcu(dto)

      toast.success("Berhasil menyimpan data")
      router.push("/admin/mcu")

    } catch (err) {
      console.error(err)
      toast.error("Gagal menyimpan data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <McuForm
      initialData={defaultData}
      nik=""
      email=""
      onSubmit={handleSubmit}
      submitLabel={loading ? "Menyimpan..." : "Simpan MCU"}
    />
  )
}