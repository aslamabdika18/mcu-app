// app/result/[code]/page.tsx

import { Card, CardContent } from "@/components/ui/card"

const data = {
  patient: {
    name: "MUHAMMAD FIRMAN LUBIS",
    date: "26 Maret 2026",
  },

  summary: [
    { label: "Tekanan Darah", value: "120/63", status: "normal" },
    { label: "LDL", value: "133 mg/dL", status: "high" },
    { label: "Nadi", value: "74 bpm", status: "normal" },
    { label: "Suhu", value: "36°C", status: "normal" },
  ],

  findings: [
    "Kadar LDL meningkat",
    "Varises pada kedua kaki",
    "Jerawat sedang pada wajah dan punggung",
    "Serumen pada telinga kanan dan kiri",
  ],

  recommendations: [
    "Konsultasi ke dokter THT",
    "Konsultasi ke dokter gigi",
    "Konsultasi ke dokter kulit",
    "Konsultasi ke dokter penyakit dalam",
    "Konsultasi ke dokter bedah",
  ],

  details: [
    { name: "LDL", value: "133", normal: "< 100", status: "high" },
    { name: "Tekanan Darah", value: "120/63", normal: "90/60 - 120/80", status: "normal" },
    { name: "Nadi", value: "74", normal: "60-100", status: "normal" },
  ],
}

const getColor = (status: string) => {
  if (status === "high") return "text-red-600"
  if (status === "warning") return "text-yellow-600"
  return "text-green-600"
}

export default function ResultPage() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <p className="text-sm text-slate-500">Hasil Medical Check-Up</p>
        <h1 className="text-xl font-semibold">{data.patient.name}</h1>
        <p className="text-sm text-slate-400">{data.patient.date}</p>

        <span className="inline-block mt-3 px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
          Perlu Perhatian
        </span>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.summary.map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="text-lg font-semibold">{item.value}</p>
              <p className={`text-xs ${getColor(item.status)}`}>
                {item.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TEMUAN */}
      <Card>
        <CardContent className="p-4">
          <p className="font-semibold mb-2">Temuan Penting</p>
          <ul className="list-disc ml-5 text-sm space-y-1">
            {data.findings.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* REKOMENDASI */}
      <Card>
        <CardContent className="p-4">
          <p className="font-semibold mb-2">Rekomendasi</p>
          <ul className="list-disc ml-5 text-sm space-y-1">
            {data.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* DETAIL */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <p className="font-semibold">Detail Pemeriksaan</p>

          {data.details.map((d, i) => (
            <div key={i} className="flex justify-between border p-2 rounded">
              <p>{d.name}</p>
              <p className={getColor(d.status)}>
                {d.value} ({d.normal})
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ACTION */}
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
        Download PDF
      </button>

    </div>
  )
}