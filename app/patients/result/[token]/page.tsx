"use client"

import { useEffect, useState } from "react"
import { getMcuByToken } from "@/lib/mcu"
import { MCUData, PemeriksaanItem, McuRecord } from "@/types/mcu"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

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

  // 🔥 FIX TANGGAL (INI YANG BENAR)
  const dateSource = record.updated_at || record.approved_at

  const approvedDate = dateSource
    ? new Date(dateSource).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "-"

  // 🔥 DOWNLOAD PDF FIX

const handleDownloadPdf = async () => {
  try {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([595, 842]) // A4

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    let y = 800

    const draw = (text: string, x = 50, size = 10, bold = false) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: bold ? boldFont : font,
        color: rgb(0, 0, 0),
      })
      y -= 15
    }

    // ================= HEADER =================
    draw("RUMAH SAKIT TK. II ISKANDAR MUDA", 120, 12, true)
    draw("MEDICAL CHECK UP", 200, 11, true)

    y -= 10

    draw(
      `Status: ${hasAbnormal ? "Perlu Perhatian" : "Normal"}`,
      50,
      10,
      true
    )

    y -= 10

    // ================= IDENTITAS =================
    draw("I. IDENTITAS", 50, 11, true)

    draw(`NIK: ${record.nik}`)
    draw(`Email: ${record.email}`)
    draw(`Nama: ${data.identitas.nama}`)
    draw(`Jenis Kelamin: ${data.identitas.jenisKelamin}`)
    draw(`TTL: ${data.identitas.ttl}`)
    draw(`Alamat: ${data.identitas.alamat}`)
    draw(`No HP: ${data.identitas.noHp}`)
    draw(`Agama: ${data.identitas.agama}`)
    draw(`BB/TB: ${data.identitas.bbTb}`)
    draw(`Gol Darah: ${data.identitas.golDarah}`)

    y -= 10

    // ================= PEMERIKSAAN =================
    draw("II. PEMERIKSAAN FISIK", 50, 11, true)

    Object.entries(data.pemeriksaanFisik).forEach(([key, val]) => {
      draw(`${key.toUpperCase()} : ${val.status} (${val.keterangan})`)
    })

    y -= 10

    // ================= KESIMPULAN =================
    draw("KESIMPULAN", 50, 11, true)
    data.kesimpulan.forEach((k) => draw(`- ${k}`))

    y -= 10

    // ================= SARAN =================
    draw("SARAN", 50, 11, true)
    data.saran.forEach((s) => draw(`- ${s}`))

    y -= 20

    // ================= FOOTER =================
    draw(`Banda Aceh, ${approvedDate}`, 350)
    y -= 30
    draw(`${data.doctorName || "-"}`, 350, 10, true)
    draw("Dokter Pemeriksa", 350)

    // ================= SAVE =================
    const pdfBytes = await pdfDoc.save()

    const buffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    ) as ArrayBuffer

    const blob = new Blob([buffer], { type: "application/pdf" })

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `hasil-mcu-${data.identitas.nama}.pdf`
    a.click()

  } catch (err) {
    console.error("PDF ERROR:", err)
    toast.error("Gagal membuat PDF")
  }
}

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* BUTTON */}
      <button
        onClick={handleDownloadPdf}
        disabled={!record}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Download PDF
      </button>

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
                  <td className={`border p-1 ${item.status === "Abnormal"
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