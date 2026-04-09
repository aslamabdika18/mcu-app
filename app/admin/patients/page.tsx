// app/admin/patients/page.tsx

import Link from "next/link"
import { supabase } from "@/lib/supabase"

import { Button } from "@/components/ui/button"
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

// 🔥 ambil data dari DB
async function getPatients() {
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

export default async function PatientsPage() {
  const data = await getPatients()

  return (
    <div className="space-y-6 p-6 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">
          Patients
        </h1>

        <Button asChild>
          <Link href="/admin/create">
            + Input MCU
          </Link>
        </Button>
      </div>

      {/* CARD */}
      <Card className="bg-white border shadow-sm">

        <CardHeader>
          <CardTitle>Daftar Pasien</CardTitle>
        </CardHeader>

        <CardContent>

          {data.length === 0 ? (
            <div className="text-center text-sm text-slate-500 py-10">
              Belum ada data
            </div>
          ) : (
            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>NIK</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status MCU</TableHead>
                  <TableHead className="text-right">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((item) => {
                  const patient = item.data?.identitas

                  return (
                    <TableRow key={item.id}>

                      <TableCell className="font-medium">
                        {patient?.nama}
                      </TableCell>

                      <TableCell className="text-slate-600">
                        {item.nik}
                      </TableCell>

                      <TableCell className="text-slate-600">
                        {item.created_at?.split("T")[0]}
                      </TableCell>

                      <TableCell>
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                          Sudah MCU
                        </span>
                      </TableCell>

                      <TableCell className="text-right space-x-2">

                        {/* Detail */}
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/patients/result/${item.access_token}`}>
                            Detail
                          </Link>
                        </Button>

                        {/* Edit */}
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