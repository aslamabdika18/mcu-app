import Link from "next/link"
import { supabase } from "@/lib/supabase"

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

import { Button } from "@/components/ui/button"

// 🔥 status mapping tetap dipakai
function getStatusConfig(status: string) {
  switch (status) {
    case "draft":
      return {
        label: "Draft",
        class: "bg-yellow-100 text-yellow-700"
      }
    case "approved":
      return {
        label: "Selesai",
        class: "bg-green-100 text-green-700"
      }
    default:
      return {
        label: "Selesai",
        class: "bg-green-100 text-green-700"
      }
  }
}

// 🔥 ambil data dari DB
async function getMcuList() {
  const { data, error } = await supabase
    .from("mcu")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export default async function MCUPage() {
  const mcuData = await getMcuList()

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            MCU Records
          </h1>
          <p className="text-sm text-slate-500">
            Data Medical Check Up
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/patients/create">
            + Tambah Pasien
          </Link>
        </Button>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar MCU</CardTitle>
        </CardHeader>

        <CardContent>

          {mcuData.length === 0 ? (
            <p className="text-center text-sm text-slate-500 py-10">
              Belum ada data
            </p>
          ) : (
            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead>NIK</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mcuData.map((item) => {
                  const data = item.data
                  const status = getStatusConfig("approved")

                  return (
                    <TableRow key={item.id}>

                      <TableCell className="text-xs text-slate-500">
                        {item.nik}
                      </TableCell>

                      <TableCell className="font-medium">
                        {data?.identitas?.nama}
                      </TableCell>

                      <TableCell>
                        {item.created_at?.split("T")[0]}
                      </TableCell>

                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded ${status.class}`}>
                          {status.label}
                        </span>
                      </TableCell>

                      <TableCell className="text-right space-x-2">

                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/patients/result/${item.access_token}`}>
                            Lihat
                          </Link>
                        </Button>

                        <Button size="sm" asChild>
                          <Link href={`/admin/edit/${item.id}`}>
                            Edit
                          </Link>
                        </Button>

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