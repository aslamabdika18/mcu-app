"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

export default function VerifyPage() {
  const router = useRouter()

  const [nik, setNik] = useState("")
  const [birth, setBirth] = useState("")
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nik || !birth) {
      toast.error("Harap isi semua data")
      return
    }

    setLoading(true)

    try {
      // 👉 nanti ganti dengan API
      // simulasi validasi
      if (nik === "123456" && birth === "1990-01-01") {
        toast.success("Verifikasi berhasil")

        const code = "test123" // nanti dari backend
        router.push(`/result/${code}`)
      } else {
        toast.error("Data tidak ditemukan")
      }
    } catch (error) {
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-6">

      <Card className="w-full max-w-md">

        <CardHeader className="text-center">
          <CardTitle>Verifikasi Hasil MCU</CardTitle>
          <CardDescription>
            Masukkan NIK dan tanggal lahir untuk mengakses hasil MCU.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">

            <div className="space-y-2">
              <Label>NIK</Label>
              <Input
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="Masukkan NIK"
              />
            </div>

            <div className="space-y-2">
              <Label>Tanggal Lahir</Label>
              <Input
                type="date"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Memverifikasi..." : "Verifikasi"}
            </Button>

          </form>
        </CardContent>

      </Card>

    </div>
  )
}