import { getMcuByToken } from "@/lib/mcu"
import { notFound } from "next/navigation"
import { MCUData, PemeriksaanItem } from "@/types/mcu"

export default async function ResultPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const record = await getMcuByToken(token)
  if (!record) return notFound()

  const data = record.data as MCUData

  type Key = keyof MCUData["pemeriksaanFisik"]

  const entries = Object.entries(data.pemeriksaanFisik) as [
    Key,
    PemeriksaanItem
  ][]

  // 🔥 kita pakai ini sekarang (tidak redundant lagi)
  const abnormalEntries = entries.filter(([, i]) => i.status === "Abnormal")

  const hasAbnormal = abnormalEntries.length > 0

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 text-sm leading-relaxed">

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

      {/* PEMERIKSAAN FISIK */}
      <div className="mb-6">
        <h2 className="font-bold border-b pb-1 mb-2">
          II. PEMERIKSAAN FISIK
        </h2>

        <p className="font-semibold">Tanda Vital</p>

        <div className="grid grid-cols-2 gap-y-1 mt-2">
          <p>Tekanan Darah</p><p>: {data.tandaVital.tekananDarah}</p>
          <p>Nadi</p><p>: {data.tandaVital.nadi}</p>
          <p>Respirasi</p><p>: {data.tandaVital.respirasi}</p>
          <p>Suhu</p><p>: {data.tandaVital.suhu}</p>
        </div>
      </div>

      {/* TABEL PEMERIKSAAN */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Pemeriksaan</p>

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
              <tr key={i} className="border">
                <td className="border p-1 capitalize">{key}</td>

                <td
                  className={`border p-1 ${
                    item.status === "Abnormal"
                      ? "text-red-600 font-semibold"
                      : "text-green-600"
                  }`}
                >
                  {item.status}
                </td>

                <td className="border p-1">
                  {item.keterangan || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* HIGHLIGHT ABNORMAL (INI UPGRADE PENTING) */}
      {hasAbnormal && (
        <div className="mb-6">
          <h2 className="font-bold border-b pb-1 mb-2 text-red-600">
            TEMUAN PENTING
          </h2>

          <ul className="list-disc ml-5 text-sm">
            {abnormalEntries.map(([key, item], i) => (
              <li key={i}>
                {key} - {item.keterangan}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* KESIMPULAN */}
      <div className="mb-6">
        <h2 className="font-bold border-b pb-1 mb-2">
          KESIMPULAN
        </h2>

        <ol className="list-decimal ml-5">
          {data.kesimpulan.map((k, i) => (
            <li key={i}>{k}</li>
          ))}
        </ol>
      </div>

      {/* SARAN */}
      <div className="mb-6">
        <h2 className="font-bold border-b pb-1 mb-2">
          SARAN
        </h2>

        <ol className="list-decimal ml-5">
          {data.saran.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>

      {/* FOOTER */}
      <div className="text-right mt-10">
        <p>Banda Aceh, ...</p>
        <p className="mt-8 font-semibold">Dokter Pemeriksa</p>
      </div>
    </div>
  )
}