"use client"

import { MCUData, PemeriksaanItem, McuRecord } from "@/types/mcu"

export function McuResultView({ record }: { record: McuRecord }) {
    const data = record.data

    if (!data) return <div>Data tidak ada</div>

    type Key = keyof MCUData["pemeriksaanFisik"]

    const entries = Object.entries(data.pemeriksaanFisik) as [
        Key,
        PemeriksaanItem
    ][]

    const abnormalEntries = entries.filter(([, i]) => i.status === "Abnormal")
    const hasAbnormal = abnormalEntries.length > 0

    const dateSource = record.updated_at || record.approved_at

    const approvedDate = dateSource
        ? new Date(dateSource).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
        : "-"

    return (
        <div className="text-sm">

            {/* HEADER */}
            <div className="text-center mb-6">
                <h1 className="font-bold text-lg">HASIL MEDICAL CHECK UP</h1>

                <p className="mt-2">
                    Status:{" "}
                    <span className={hasAbnormal ? "text-yellow-700" : "text-green-700"}>
                        {hasAbnormal ? "Perlu Perhatian" : "Normal"}
                    </span>
                </p>
            </div>

            {/* IDENTITAS */}
            <div className="mb-6">
                <h2 className="font-bold border-b mb-2">Identitas</h2>

                <div className="grid grid-cols-2 gap-y-1">
                    <p>NIK</p><p>: {record.nik}</p>
                    <p>Email</p><p>: {record.email}</p>
                    <p>Nama</p><p>: {data.identitas.nama}</p>
                    <p>TTL</p><p>: {data.identitas.ttl}</p>
                    <p>Alamat</p><p>: {data.identitas.alamat}</p>
                    <p>No HP</p><p>: {data.identitas.noHp}</p>
                </div>
            </div>

            {/* TABLE */}
            <div className="mb-6">
                <h2 className="font-bold border-b mb-2">Pemeriksaan</h2>

                <table className="w-full border text-xs">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-1">Bagian</th>
                            <th className="border p-1">Status</th>
                            <th className="border p-1">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map(([key, item], i) => (
                            <tr key={i}>
                                <td className="border p-1 capitalize">{key}</td>
                                <td className="border p-1">{item.status}</td>
                                <td className="border p-1">{item.keterangan || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* FOOTER */}
            <div className="text-right mt-10">
                <p>{approvedDate}</p>

                <p className="mt-10 font-semibold">
                    {data.doctorName || "-"}
                </p>

                <p className="text-xs text-gray-500">
                    Dokter Pemeriksa
                </p>
            </div>

        </div>
    )
}