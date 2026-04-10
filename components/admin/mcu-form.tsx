"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { MCUData, Status } from "@/types/mcu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// ======================
const pemeriksaanKeys: (keyof MCUData["pemeriksaanFisik"])[] = [
    "kepala", "wajah", "mata", "thtKanan", "thtKiri", "tonsil", "thorax",
    "gigi", "thyroid", "jantung", "paru", "abdomen", "kulit",
    "perianal", "genitalia", "extremitasAtas", "extremitasBawah",
]

const statusOptions: Status[] = ["Normal", "Abnormal"]

// ======================
function Field({
    label,
    children,
    className = "",
}: {
    label: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={`space-y-1 ${className}`}>
            <Label>{label}</Label>
            {children}
        </div>
    )
}

// ======================
type Props = {
    initialData: MCUData
    nik: string
    email: string

    onSubmit: (payload: {
        data: MCUData
        nik: string
        email: string
    }) => void

    submitLabel: string

    // 🔥 optional (lebih fleksibel)
    backUrl?: string
}

// ======================
export function McuForm({
    initialData,
    nik: initialNik,
    email: initialEmail,
    onSubmit,
    submitLabel,
    backUrl,
}: Props) {

    // ✅ FIX: hook di dalam component
    const router = useRouter()

    const [data, setData] = useState<MCUData>(initialData)
    const [nik, setNik] = useState(initialNik)
    const [email, setEmail] = useState(initialEmail)

    // ======================
    const updateIdentitas = (
        key: keyof MCUData["identitas"],
        value: string
    ) => {
        setData({
            ...data,
            identitas: {
                ...data.identitas,
                [key]: value,
            },
        })
    }

    const updateVital = (
        key: keyof MCUData["tandaVital"],
        value: string
    ) => {
        setData({
            ...data,
            tandaVital: {
                ...data.tandaVital,
                [key]: value,
            },
        })
    }

    const updateStatus = (
        key: keyof MCUData["pemeriksaanFisik"],
        status: Status
    ) => {
        setData({
            ...data,
            pemeriksaanFisik: {
                ...data.pemeriksaanFisik,
                [key]: {
                    ...data.pemeriksaanFisik[key],
                    status,
                },
            },
        })
    }

    const updateKeterangan = (
        key: keyof MCUData["pemeriksaanFisik"],
        value: string
    ) => {
        setData({
            ...data,
            pemeriksaanFisik: {
                ...data.pemeriksaanFisik,
                [key]: {
                    ...data.pemeriksaanFisik[key],
                    keterangan: value,
                },
            },
        })
    }

    // ======================
    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* HEADER */}
                <div className="bg-white p-6 rounded-xl border flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold">Form MCU</h1>
                        <p className="text-sm text-slate-500">
                            Input atau edit data medical check-up
                        </p>
                    </div>

                    {/* ✅ tombol kembali clean */}
                    <Button
                        variant="outline"
                        onClick={() => router.push(backUrl ?? "/admin/mcu")}
                    >
                        ← Kembali
                    </Button>
                </div>

                {/* DTO */}
                <div className="bg-white p-6 rounded-xl border space-y-4">
                    <h2 className="font-semibold border-b pb-2">DATA UTAMA</h2>

                    <Field label="NIK">
                        <Input
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                        />
                    </Field>

                    <Field label="Email">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Field>
                </div>

                {/* IDENTITAS */}
                <div className="bg-white p-6 rounded-xl border space-y-4">
                    <h2 className="font-semibold border-b pb-2">
                        IDENTITAS PASIEN
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        <Field label="Nama">
                            <Input
                                value={data.identitas.nama}
                                onChange={(e) => updateIdentitas("nama", e.target.value)}
                            />
                        </Field>

                        <Field label="TTL">
                            <Input
                                value={data.identitas.ttl}
                                onChange={(e) => updateIdentitas("ttl", e.target.value)}
                            />
                        </Field>

                        <Field label="Alamat" className="md:col-span-2">
                            <Input
                                value={data.identitas.alamat}
                                onChange={(e) => updateIdentitas("alamat", e.target.value)}
                            />
                        </Field>

                        <Field label="No HP">
                            <Input
                                value={data.identitas.noHp}
                                onChange={(e) => updateIdentitas("noHp", e.target.value)}
                            />
                        </Field>

                        <Field label="Agama">
                            <Input
                                value={data.identitas.agama}
                                onChange={(e) => updateIdentitas("agama", e.target.value)}
                            />
                        </Field>

                        <Field label="BB/TB">
                            <Input
                                value={data.identitas.bbTb}
                                onChange={(e) => updateIdentitas("bbTb", e.target.value)}
                            />
                        </Field>

                        <Field label="Gol Darah">
                            <Input
                                value={data.identitas.golDarah}
                                onChange={(e) => updateIdentitas("golDarah", e.target.value)}
                            />
                        </Field>

                    </div>
                </div>

                {/* TANDA VITAL */}
                <div className="bg-white p-6 rounded-xl border space-y-4">
                    <h2 className="font-semibold border-b pb-2">
                        TANDA VITAL
                    </h2>

                    <div className="grid md:grid-cols-4 gap-4">

                        <Field label="Tekanan Darah">
                            <Input
                                value={data.tandaVital.tekananDarah}
                                onChange={(e) => updateVital("tekananDarah", e.target.value)}
                            />
                        </Field>

                        <Field label="Nadi">
                            <Input
                                value={data.tandaVital.nadi}
                                onChange={(e) => updateVital("nadi", e.target.value)}
                            />
                        </Field>

                        <Field label="Respirasi">
                            <Input
                                value={data.tandaVital.respirasi}
                                onChange={(e) => updateVital("respirasi", e.target.value)}
                            />
                        </Field>

                        <Field label="Suhu">
                            <Input
                                value={data.tandaVital.suhu}
                                onChange={(e) => updateVital("suhu", e.target.value)}
                            />
                        </Field>

                    </div>
                </div>

                {/* PEMERIKSAAN */}
                <div className="bg-white p-6 rounded-xl border space-y-4">
                    <h2 className="font-semibold border-b pb-2">
                        PEMERIKSAAN FISIK
                    </h2>

                    {pemeriksaanKeys.map((key) => (
                        <div key={key} className="border p-4 rounded">

                            <div className="flex justify-between mb-2">
                                <p className="capitalize">{key}</p>

                                <div className="flex gap-2">
                                    {statusOptions.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => updateStatus(key, s)}
                                            className={`px-2 py-1 border rounded ${data.pemeriksaanFisik[key].status === s
                                                    ? s === "Normal"
                                                        ? "bg-green-100"
                                                        : "bg-red-100"
                                                    : ""
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Textarea
                                value={data.pemeriksaanFisik[key].keterangan}
                                onChange={(e) => updateKeterangan(key, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                {/* KESIMPULAN */}
                <div className="bg-white p-6 rounded-xl border">
                    <Label>Kesimpulan</Label>
                    <Textarea
                        value={data.kesimpulan.join("\n")}
                        onChange={(e) =>
                            setData({
                                ...data,
                                kesimpulan: e.target.value.split("\n"),
                            })
                        }
                    />
                </div>

                {/* SARAN */}
                <div className="bg-white p-6 rounded-xl border">
                    <Label>Saran</Label>
                    <Textarea
                        value={data.saran.join("\n")}
                        onChange={(e) =>
                            setData({
                                ...data,
                                saran: e.target.value.split("\n"),
                            })
                        }
                    />
                </div>

                {/* ACTION */}
                <div className="flex justify-end">
                    <Button onClick={() => onSubmit({ data, nik, email })}>
                        {submitLabel}
                    </Button>
                </div>

            </div>
        </div>
    )
}