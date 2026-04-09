"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createMcu } from "@/lib/mcu";
import { CreateMcuDTO, MCUData } from "@/types/mcu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const pemeriksaanKeys = [
  "kepala",
  "wajah",
  "mata",
  "thtKanan",
  "thtKiri",
  "tonsil",
  "thorax",
  "gigi",
  "thyroid",
  "jantung",
  "paru",
  "abdomen",
  "kulit",
  "perianal",
  "genitalia",
  "extremitasAtas",
  "extremitasBawah",
] as const;

export default function CreateMcuPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    jenisKelamin: "",
    ttl: "",
    alamat: "",
    noHp: "",
    bbTb: "",
    golDarah: "",
    tekananDarah: "",
    nadi: "",
    respirasi: "",
    suhu: "",
    kesimpulan: "",
    saran: "",
  });

  const [pemeriksaan, setPemeriksaan] = useState<
    Record<string, { status: "Normal" | "Abnormal"; keterangan: string }>
  >({});

  const handleSubmit = async () => {
    const data: MCUData = {
      identitas: {
        nama: form.nama,
        jenisKelamin: form.jenisKelamin,
        ttl: form.ttl,
        alamat: form.alamat,
        noHp: form.noHp,
        agama: "-",
        bbTb: form.bbTb,
        golDarah: form.golDarah,
      },
      tandaVital: {
        tekananDarah: form.tekananDarah,
        nadi: form.nadi,
        respirasi: form.respirasi,
        suhu: form.suhu,
      },
      pemeriksaanFisik: pemeriksaan as MCUData["pemeriksaanFisik"],
      kesimpulan: form.kesimpulan.split("\n"),
      saran: form.saran.split("\n"),
    };

    const dto: CreateMcuDTO = {
      nik: "AUTO",
      email: "test@email.com",
      ttl: form.ttl,
      data,
    };

    const result = await createMcu(dto);

    router.push(`/patients/result/${result.access_token}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h1 className="text-xl font-bold">Form Medical Check-Up</h1>
          <p className="text-sm text-slate-500">
            Input data pasien dan hasil pemeriksaan
          </p>
        </div>

        {/* IDENTITAS */}
        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h2 className="font-semibold text-slate-800">I. IDENTITAS PASIEN</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Nama</Label>
              <Input
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
              />
            </div>

            <div>
              <Label>Jenis Kelamin</Label>
              <select
                className="border rounded-md px-3 py-2 w-full"
                onChange={(e) =>
                  setForm({ ...form, jenisKelamin: e.target.value })
                }
              >
                <option disabled value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <Label>TTL</Label>
              <Input
                onChange={(e) => setForm({ ...form, ttl: e.target.value })}
              />
            </div>

            <div>
              <Label>No HP</Label>
              <Input
                onChange={(e) => setForm({ ...form, noHp: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Alamat</Label>
              <Input
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              />
            </div>

            <div>
              <Label>BB / TB</Label>
              <Input
                onChange={(e) => setForm({ ...form, bbTb: e.target.value })}
              />
            </div>

            <div>
              <Label>Golongan Darah</Label>
              <Input
                onChange={(e) => setForm({ ...form, golDarah: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* TANDA VITAL */}
        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h2 className="font-semibold text-slate-800">II. TANDA VITAL</h2>

          <div className="grid md:grid-cols-4 gap-4">
            <Input
              placeholder="Tekanan Darah"
              onChange={(e) =>
                setForm({ ...form, tekananDarah: e.target.value })
              }
            />
            <Input
              placeholder="Nadi"
              onChange={(e) => setForm({ ...form, nadi: e.target.value })}
            />
            <Input
              placeholder="Respirasi"
              onChange={(e) => setForm({ ...form, respirasi: e.target.value })}
            />
            <Input
              placeholder="Suhu"
              onChange={(e) => setForm({ ...form, suhu: e.target.value })}
            />
          </div>
        </div>

        {/* PEMERIKSAAN */}
        <div className="bg-white p-6 rounded-xl border space-y-4">
          <h2 className="font-semibold text-slate-800">
            III. PEMERIKSAAN FISIK
          </h2>

          <div className="space-y-3">
            {pemeriksaanKeys.map((key) => (
              <div
                key={key}
                className="border rounded-lg p-3 grid md:grid-cols-3 gap-3 items-center"
              >
                <p className="font-medium capitalize">{key}</p>

                <select
                  className="border rounded px-2 py-1"
                  onChange={(e) =>
                    setPemeriksaan({
                      ...pemeriksaan,
                      [key]: {
                        ...(pemeriksaan[key] || {}),
                        status: e.target.value as "Normal" | "Abnormal",
                      },
                    })
                  }
                >
                  <option value="Normal">Normal</option>
                  <option value="Abnormal">Abnormal</option>
                </select>

                <Textarea
                  placeholder="Keterangan..."
                  onChange={(e) =>
                    setPemeriksaan({
                      ...pemeriksaan,
                      [key]: {
                        ...(pemeriksaan[key] || {}),
                        keterangan: e.target.value,
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* KESIMPULAN */}
        <div className="bg-white p-6 rounded-xl border space-y-2">
          <h2 className="font-semibold">KESIMPULAN</h2>
          <Textarea
            onChange={(e) => setForm({ ...form, kesimpulan: e.target.value })}
          />
        </div>

        {/* SARAN */}
        <div className="bg-white p-6 rounded-xl border space-y-2">
          <h2 className="font-semibold">SARAN</h2>
          <Textarea
            onChange={(e) => setForm({ ...form, saran: e.target.value })}
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Simpan MCU</Button>
        </div>
      </div>
    </div>
  );
}
