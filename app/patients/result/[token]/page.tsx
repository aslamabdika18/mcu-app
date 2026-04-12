"use client"

import { useEffect, useState } from "react"
import { getMcuByToken } from "@/lib/mcu"
import { MCUData, PemeriksaanItem } from "@/types/mcu"
import { useParams } from "next/navigation"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

type McuRecord = {
  data: MCUData
  approved_at?: string
}

export default function ResultPage() {
  const params = useParams()
  const token = params.token as string

  const [record, setRecord] = useState<McuRecord | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMcuByToken(token)
      if (!res) return
      setRecord(res)
    }

    fetchData()
  }, [token])

  if (!record) {
    return <div className="p-10 text-center">Loading...</div>
  }

  const data = record.data

  type Key = keyof MCUData["pemeriksaanFisik"]

  const entries = Object.entries(data.pemeriksaanFisik) as [
    Key,
    PemeriksaanItem
  ][]

  const abnormalEntries = entries.filter(([, i]) => i.status === "Abnormal")
  const hasAbnormal = abnormalEntries.length > 0

  // 🔥 FORMAT TANGGAL
  const approvedDate = record.approved_at
    ? new Date(record.approved_at).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-"

  // 🔥 DOWNLOAD PDF FIX TOTAL
  const handleDownloadPdf = async () => {
    const element = document.getElementById("mcu-result")
    if (!element) return

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
    })

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")

    const pageWidth = 210
    const pageHeight = 297

    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(`hasil-mcu-${data.identitas.nama}.pdf`)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* BUTTON */}
      <div className="max-w-3xl mx-auto mb-4 flex justify-end">
        <button
          onClick={handleDownloadPdf}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Download PDF
        </button>
      </div>

      {/* CONTENT */}
      <div
        id="mcu-result"
        className="max-w-3xl mx-auto bg-white p-8 text-sm leading-relaxed"
      >

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="font-bold text-lg">
            RUMAH SAKIT TK. II ISKANDAR MUDA
          </h1>
          <p className="font-semibold">MEDICAL CHECK UP</p>

          <p className="mt-2 text-sm">
            Status:{" "}
            <span
              className={
                hasAbnormal
                  ? "text-yellow-700 font-semibold"
                  : "text-green-700 font-semibold"
              }
            >
              {hasAbnormal ? "Perlu Perhatian" : "Normal"}
            </span>
          </p>
        </div>

        {/* IDENTITAS */}
        <div className="mb-6">
          <h2 className="font-bold border-b pb-1 mb-2">I. IDENTITAS</h2>

          <div className="grid grid-cols-2 gap-y-1">
            <p>Nama</p><p>: {data.identitas.nama}</p>
            <p>Jenis Kelamin</p><p>: {data.identitas.jenisKelamin}</p>
            <p>TTL</p><p>: {data.identitas.ttl}</p>
            <p>Alamat</p><p>: {data.identitas.alamat}</p>
            <p>No HP</p><p>: {data.identitas.noHp}</p>
            <p>Agama</p><p>: {data.identitas.agama}</p>
            <p>BB/TB</p><p>: {data.identitas.bbTb}</p>
            <p>Gol Darah</p><p>: {data.identitas.golDarah}</p>
          </div>
        </div>

        {/* PEMERIKSAAN */}
        <div className="mb-6">
          <h2 className="font-bold border-b pb-1 mb-2">
            II. PEMERIKSAAN FISIK
          </h2>

          <table className="w-full border text-xs">
            <thead>
              <tr className="border bg-slate-100">
                <th className="border p-1">Bagian</th>
                <th className="border p-1">Status</th>
                <th className="border p-1">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([key, item], i) => (
                <tr key={i}>
                  <td className="border p-1 capitalize">{key}</td>
                  <td className={`border p-1 ${
                    item.status === "Abnormal"
                      ? "text-red-600 font-semibold"
                      : "text-green-600"
                  }`}>
                    {item.status}
                  </td>
                  <td className="border p-1">{item.keterangan || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="text-right mt-10">
          <p>Banda Aceh, {approvedDate}</p>

          <p className="mt-10 font-semibold">
            {data.doctorName || "Dokter Pemeriksa"}
          </p>

          <p className="text-xs text-gray-500">
            Dokter Pemeriksa
          </p>
        </div>

      </div>
    </div>
  )
}