"use client"

import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { PageHeader } from "@/components/admin/page-header"

// 🔥 dummy data (nanti dari API)
const mcuDetail = {
  id: "MCU-001",
  status: "draft", // coba ganti jadi approved untuk test lock
  patient: {
    name: "MUHAMMAD FIRMAN LUBIS",
    nik: "1234567890"
  },
  vitals: {
    bloodPressure: "120/63",
    pulse: "74",
    respiration: "24",
    temperature: "36"
  },
  diagnoses: "Serumen\nChonca Hipertropi",
  recommendations: "Konsul THT\nKonsul Gigi"
}

const pemeriksaanList = [
  "Kepala",
  "Wajah",
  "Mata",
  "THT Kanan",
  "THT Kiri",
  "Tonsil",
  "Thorax",
  "Gigi",
  "Thyroid",
  "Jantung",
  "Paru",
  "Abdomen",
  "Kulit",
  "Extremitas Atas",
  "Extremitas Bawah"
]

export default function EditMcuPage() {
  const params = useParams()
  const router = useRouter()

  const isLocked = mcuDetail.status === "approved"

  function handleSubmit() {
    if (isLocked) return

    console.log("update MCU:", params.id)
    router.push("/admin/mcu")
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">

      <PageHeader
        title="Edit MCU"
        description={`${mcuDetail.patient.name}`}
        showBack
      />

      {/* 🔥 WARNING jika locked */}
      {isLocked && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm">
          Data sudah disetujui dan tidak bisa diedit
        </div>
      )}

      {/* IDENTITAS */}
      <div className="bg-white p-6 rounded-lg border space-y-4">

        <h2 className="font-semibold">I. IDENTITAS</h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <Label>Nama</Label>
            <Input
              defaultValue={mcuDetail.patient.name}
              disabled
            />
          </div>

          <div>
            <Label>NIK</Label>
            <Input
              defaultValue={mcuDetail.patient.nik}
              disabled
            />
          </div>

        </div>

      </div>

      {/* VITAL */}
      <div className="bg-white p-6 rounded-lg border space-y-4">

        <h2 className="font-semibold">
          II. PEMERIKSAAN FISIK (TANDA VITAL)
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <Input defaultValue={mcuDetail.vitals.bloodPressure} disabled={isLocked} />
          <Input defaultValue={mcuDetail.vitals.pulse} disabled={isLocked} />
          <Input defaultValue={mcuDetail.vitals.respiration} disabled={isLocked} />
          <Input defaultValue={mcuDetail.vitals.temperature} disabled={isLocked} />

        </div>

      </div>

      {/* PEMERIKSAAN */}
      <div className="bg-white p-6 rounded-lg border space-y-4">

        <h2 className="font-semibold">PEMERIKSAAN FISIK</h2>

        <table className="w-full border text-sm">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 border text-left">Pemeriksaan</th>
              <th className="p-2 border text-center">Normal</th>
              <th className="p-2 border text-center">Abnormal</th>
              <th className="p-2 border text-left">Keterangan</th>
            </tr>
          </thead>

          <tbody>
            {pemeriksaanList.map((item, i) => (
              <tr key={i} className="border">

                <td className="p-2 border">{item}</td>

                <td className="text-center border">
                  <input type="radio" name={`status-${i}`} disabled={isLocked} />
                </td>

                <td className="text-center border">
                  <input type="radio" name={`status-${i}`} disabled={isLocked} />
                </td>

                <td className="p-2 border">
                  <Textarea disabled={isLocked} />
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* KESIMPULAN */}
      <div className="bg-white p-6 rounded-lg border space-y-2">

        <h2 className="font-semibold">KESIMPULAN</h2>

        <Textarea
          defaultValue={mcuDetail.diagnoses}
          disabled={isLocked}
          className="min-h-[120px]"
        />

      </div>

      {/* SARAN */}
      <div className="bg-white p-6 rounded-lg border space-y-2">

        <h2 className="font-semibold">SARAN</h2>

        <Textarea
          defaultValue={mcuDetail.recommendations}
          disabled={isLocked}
          className="min-h-[120px]"
        />

      </div>

      {/* ACTION */}
      <div className="flex justify-end gap-2">

        <Button variant="outline" onClick={() => router.back()}>
          Kembali
        </Button>

        {!isLocked && (
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            Update MCU
          </Button>
        )}

      </div>

    </div>
  )
}