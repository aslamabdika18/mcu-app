// app/admin/mcu/[id]/page.tsx

import { mcuDetail } from "@/lib/dummy/mcu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/admin/page-header"

export default function McuDetailPage() {
  const data = mcuDetail

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <PageHeader
        title="Detail MCU"
        description={`${data.patient.name} • ${data.date}`}
        showBack
      />

      {/* Patient Info */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Informasi Pasien</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">

          <div>
            <p className="text-slate-500">Nama</p>
            <p className="font-medium">{data.patient.name}</p>
          </div>

          <div>
            <p className="text-slate-500">Jenis Kelamin</p>
            <p>{data.patient.gender}</p>
          </div>

          <div>
            <p className="text-slate-500">Tanggal Lahir</p>
            <p>{data.patient.birthDate}</p>
          </div>

          <div>
            <p className="text-slate-500">Dokter</p>
            <p>{data.doctor}</p>
          </div>

        </CardContent>
      </Card>

      {/* Vitals */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Tanda Vital</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-4 text-sm">

          <div>
            <p className="text-slate-500">Tekanan Darah</p>
            <p className="font-medium">{data.vitals.bloodPressure}</p>
          </div>

          <div>
            <p className="text-slate-500">Nadi</p>
            <p>{data.vitals.pulse} bpm</p>
          </div>

          <div>
            <p className="text-slate-500">Respirasi</p>
            <p>{data.vitals.respiration}</p>
          </div>

          <div>
            <p className="text-slate-500">Suhu</p>
            <p>{data.vitals.temperature}°C</p>
          </div>

        </CardContent>
      </Card>

      {/* Pemeriksaan */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Pemeriksaan Fisik</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">

          {data.examinations.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-md p-3 bg-white"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                {item.notes && (
                  <p className="text-sm text-slate-500">{item.notes}</p>
                )}
              </div>

              <span
                className={`text-xs px-2 py-1 rounded ${item.status === "normal"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {item.status}
              </span>
            </div>
          ))}

        </CardContent>
      </Card>

      {/* Lab */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Hasil Lab</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">

          {data.labs.map((lab, i) => (
            <div key={i} className="flex justify-between border p-3 rounded-md">

              <p>{lab.name}</p>

              <p
                className={`font-medium ${lab.status === "high"
                    ? "text-red-600"
                    : "text-green-600"
                  }`}
              >
                {lab.value} {lab.unit}
              </p>

            </div>
          ))}

        </CardContent>
      </Card>

      {/* Diagnosis */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Kesimpulan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">

          {data.diagnoses.map((d, i) => (
            <p key={i}>• {d}</p>
          ))}

        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Saran</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">

          {data.recommendations.map((r, i) => (
            <p key={i}>• {r}</p>
          ))}

        </CardContent>
      </Card>

    </div>
  )
}