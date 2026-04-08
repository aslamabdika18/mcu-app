"use client"

import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { PageHeader } from "@/components/admin/page-header"

const patient = {
  id: "P001",
  name: "MUHAMMAD FIRMAN LUBIS",
  nik: "1234567890"
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

export default function CreateMcuPage() {
  const params = useParams()
  const router = useRouter()

  function handleSubmit() {
    console.log("submit MCU", params.id)
    router.push("/admin/mcu")
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">

      <PageHeader
        title="Input Medical Check Up"
        description={`${patient.name}`}
        showBack
      />

      {/* IDENTITAS */}
      <div className="bg-white p-6 rounded-lg border space-y-4">

        <h2 className="font-semibold text-slate-800">
          I. IDENTITAS
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <Label>Nama</Label>
            <Input defaultValue={patient.name} />
          </div>

          <div>
            <Label>Jenis Kelamin</Label>
            <Input placeholder="Laki-laki" />
          </div>

          <div>
            <Label>Tanggal Lahir</Label>
            <Input type="date" />
          </div>

          <div>
            <Label>Alamat</Label>
            <Input placeholder="Alamat pasien" />
          </div>

          <div>
            <Label>No HP</Label>
            <Input placeholder="08xxxx" />
          </div>

          <div>
            <Label>BB / TB</Label>
            <Input placeholder="60kg / 165cm" />
          </div>

        </div>

      </div>

      {/* TANDA VITAL */}
      <div className="bg-white p-6 rounded-lg border space-y-4">

        <h2 className="font-semibold text-slate-800">
          II. PEMERIKSAAN FISIK (TANDA VITAL)
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div>
            <Label>Tekanan Darah</Label>
            <Input placeholder="120/80" />
          </div>

          <div>
            <Label>Nadi</Label>
            <Input placeholder="74" />
          </div>

          <div>
            <Label>Respirasi</Label>
            <Input placeholder="24" />
          </div>

          <div>
            <Label>Suhu</Label>
            <Input placeholder="36°C" />
          </div>

        </div>

      </div>

      {/* PEMERIKSAAN DETAIL */}
      <div className="bg-white p-6 rounded-lg border space-y-4">

        <h2 className="font-semibold text-slate-800">
          PEMERIKSAAN FISIK
        </h2>

        <div className="overflow-x-auto">
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
                    <input type="radio" name={`status-${i}`} />
                  </td>

                  <td className="text-center border">
                    <input type="radio" name={`status-${i}`} />
                  </td>

                  <td className="p-2 border">
                    <Textarea placeholder="Keterangan..." />
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

      {/* LAB */}
      <div className="bg-white p-6 rounded-lg border space-y-4">

        <h2 className="font-semibold text-slate-800">
          HASIL LAB
        </h2>

        <div className="flex gap-3">
          <Input placeholder="Parameter (LDL)" />
          <Input placeholder="Nilai" />
          <Input placeholder="Satuan" />
        </div>

      </div>

      {/* KESIMPULAN */}
      <div className="bg-white p-6 rounded-lg border space-y-2">

        <h2 className="font-semibold text-slate-800">
          KESIMPULAN
        </h2>

        <Textarea
          className="min-h-[120px]"
          placeholder="Isi kesimpulan..."
        />

      </div>

      {/* SARAN */}
      <div className="bg-white p-6 rounded-lg border space-y-2">

        <h2 className="font-semibold text-slate-800">
          SARAN
        </h2>

        <Textarea
          className="min-h-[120px]"
          placeholder="Isi saran..."
        />

      </div>

      {/* ACTION */}
      <div className="flex justify-end gap-2">

        <Button
          variant="outline"
          onClick={() => router.back()}
        >
          Batal
        </Button>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleSubmit}
        >
          Simpan MCU
        </Button>

      </div>

    </div>
  )
}