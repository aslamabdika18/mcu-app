"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { MCUData } from "@/types/mcu"
import { toast } from "sonner"
import QRCode from "qrcode"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/admin/delete-button"

type McuRecord = {
  id: string
  nik: string
  email: string
  access_token: string
  created_at: string
  status: string
  email_sent: boolean
  data: MCUData | null
}

export default function MCUPage() {
  const [mcuData, setMcuData] = useState<McuRecord[]>([])
  const [qrMap, setQrMap] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  const fetchData = async (): Promise<McuRecord[]> => {
    const { data } = await supabase
      .from("mcu")
      .select("*")
      .order("created_at", { ascending: false })

    return (data || []) as McuRecord[]
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      const result = await fetchData()
      setMcuData(result)

      // 🔥 FIX QR (PARALLEL)
      const map: Record<string, string> = {}

      await Promise.all(
        result.map(async (item) => {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL}/patients/result/${item.access_token}`
          map[item.id] = await QRCode.toDataURL(url)
        })
      )

      setQrMap(map)
      setLoading(false)
    }

    load()
  }, [])

  const handleApprove = (id: string) => {
    const promise = (async () => {
      await supabase.from("mcu").update({ status: "approved" }).eq("id", id)
    })()

    toast.promise(promise, {
      loading: "Mengapprove...",
      success: async () => {
        setMcuData(prev =>
          prev.map(item =>
            item.id === id ? { ...item, status: "approved" } : item
          )
        )
        return "Berhasil diapprove"
      },
      error: "Gagal approve",
    })
  }

  const handleSendEmail = (item: McuRecord) => {
    const promise = (async () => {

      const res = await fetch("/api/mcu/send-mcu-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: item.email,
          name: item.data?.identitas.nama,
          token: item.access_token,
        }),
      })

      if (!res.ok) {
        throw new Error("Email gagal dikirim")
      }

      await supabase
        .from("mcu")
        .update({ email_sent: true })
        .eq("id", item.id)

    })()

    toast.promise(promise, {
      loading: "Mengirim email...",
      success: () => {
        setMcuData(prev =>
          prev.map(i =>
            i.id === item.id ? { ...i, email_sent: true } : i
          )
        )
        return "Email berhasil dikirim"
      },
      error: "Gagal kirim email",
    })
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">MCU Records</h1>
          <p className="text-sm text-slate-500">
            Flow: Input → Approve → Kirim Email → QR
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/mcu/create">+ Tambah MCU</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar MCU</CardTitle>
        </CardHeader>

        <CardContent>

          {/* 🔥 LOADING */}
          {loading && (
            <div className="text-center py-10 text-slate-500">
              Loading data...
            </div>
          )}

          {!loading && mcuData.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              Belum ada data
            </div>
          )}

          {!loading && mcuData.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIK</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>QR</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mcuData.map((item) => {
                  const identitas = item.data?.identitas

                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.nik}</TableCell>
                      <TableCell>{identitas?.nama || "-"}</TableCell>
                      <TableCell>{item.created_at.split("T")[0]}</TableCell>

                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${item.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                          }`}>
                          {item.status}
                        </span>
                      </TableCell>

                      <TableCell>
                        {item.email_sent ? "✔ terkirim" : "belum"}
                      </TableCell>

                      <TableCell>
                        {qrMap[item.id] ? (
                          <img
                            src={qrMap[item.id]}
                            className="w-16 h-16 border rounded"
                          />
                        ) : "Loading..."}
                      </TableCell>

                      <TableCell className="text-right space-x-2">
                        <Button size="sm" asChild>
                          <Link href={`/admin/mcu/edit/${item.id}`}>Edit</Link>
                        </Button>

                        {item.status !== "approved" && (
                          <Button size="sm" onClick={() => handleApprove(item.id)}>
                            Approve
                          </Button>
                        )}

                        {item.status === "approved" && (
                          <Button
                            size="sm"
                            variant={item.email_sent ? "secondary" : "outline"}
                            onClick={() => handleSendEmail(item)}
                          >
                            {item.email_sent ? "Kirim Ulang" : "Kirim Email"}
                          </Button>
                        )}
                        <DeleteButton
                          id={item.id}
                          onDelete={(id) => {
                            setMcuData(prev => prev.filter(item => item.id !== id))
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}

        </CardContent>
      </Card>

    </div>
  )
}