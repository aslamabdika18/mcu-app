"use client"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

const mcuData = [
  {
    id: "MCU-001",
    patient: "Budi Santoso",
    patientId: "P001",
    date: "2026-03-26",
    status: "draft",
    doctor: "dr. Andi"
  },
  {
    id: "MCU-002",
    patient: "Siti Rahma",
    patientId: "P002",
    date: "2026-03-25",
    status: "approved",
    doctor: "dr. Budi"
  }
]

// 🔥 lebih realistis
function getStatusConfig(status: string) {
  switch (status) {
    case "draft":
      return {
        label: "Draft",
        class: "bg-yellow-100 text-yellow-700 border border-yellow-200"
      }
    case "submitted":
      return {
        label: "Menunggu Review",
        class: "bg-blue-100 text-blue-700 border border-blue-200"
      }
    case "approved":
      return {
        label: "Selesai",
        class: "bg-green-100 text-green-700 border border-green-200"
      }
    default:
      return {
        label: "-",
        class: "bg-gray-100 text-gray-600"
      }
  }
}

export default function MCUPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // 🔥 filter simple (nanti ganti server-side)
  const filteredData = mcuData.filter((item) => {
    const matchSearch = item.patient
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchStatus = statusFilter
      ? item.status === statusFilter
      : true

    return matchSearch && matchStatus
  })

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
            MCU Records
          </h1>
          <p className="text-sm text-slate-500">
            Kelola data medical check up
          </p>
        </div>

        {/* 🔥 FIX: arahkan ke pasien dulu */}
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
          <Link href="/admin/patients">
            Pilih Pasien
          </Link>
        </Button>
      </div>

      {/* Filter */}
      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row gap-3">

          <Input
            placeholder="Cari nama pasien..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Input type="date" />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="">Semua Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Menunggu Review</option>
            <option value="approved">Selesai</option>
          </select>

        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border border-slate-200 shadow-sm">

        <CardHeader>
          <CardTitle>Daftar MCU</CardTitle>
        </CardHeader>

        <CardContent>

          {filteredData.length === 0 ? (
            <div className="text-center py-10 text-sm text-slate-500">
              Tidak ada data MCU
            </div>
          ) : (
            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Pasien</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Dokter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredData.map((item) => {
                  const status = getStatusConfig(item.status)

                  return (
                    <TableRow
                      key={item.id}
                      className="hover:bg-slate-50 transition"
                    >

                      <TableCell className="text-slate-500 text-xs">
                        {item.id}
                      </TableCell>

                      <TableCell className="font-medium text-slate-800">
                        {item.patient}
                      </TableCell>

                      <TableCell className="text-slate-600">
                        {item.date}
                      </TableCell>

                      <TableCell className="text-slate-600">
                        {item.doctor}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-medium ${status.class}`}
                        >
                          {status.label}
                        </span>
                      </TableCell>

                      <TableCell className="text-right space-x-2">

                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/mcu/${item.id}`}>
                            Detail
                          </Link>
                        </Button>

                        {item.status !== "approved" && (
                          <Button size="sm" asChild>
                            <Link href={`/admin/mcu/edit/${item.id}`}>
                              Edit
                            </Link>
                          </Button>
                        )}

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