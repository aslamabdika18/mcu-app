import { MCUData, PemeriksaanItem, McuRecord } from "@/types/mcu"

type Props = {
    record: McuRecord
}

export default function McuResultView({ record }: Props) {
    const data = record.data

    type Key = keyof MCUData["pemeriksaanFisik"]

    const entries = Object.entries(data.pemeriksaanFisik) as [
        Key,
        PemeriksaanItem
    ][]

    const hasAbnormal = entries.some(([, i]) => i.status === "Abnormal")

    const dateSource = record.updated_at || record.approved_at

    const approvedDate = dateSource
        ? new Date(dateSource).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
        : "-"

    return (
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
                <h2 className="font-bold border-b pb-1 mb-2">
                    I. IDENTITAS
                </h2>

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

            {/* TABLE */}
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
                                <td
                                    className={`border p-1 ${item.status === "Abnormal"
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
    )
}