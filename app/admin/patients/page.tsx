// app/admin/patients/page.tsx

import Link from "next/link"

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

import { patients } from "@/lib/dummy/patients"
import {
  getMcuStatusLabel,
  getMcuStatusStyle
} from "@/lib/utils/mcu-status"

export default async function PatientsPage() {

  // 🔥 nanti tinggal ganti ini ke API
  const data = patients

  return (
    <div className="space-y-6 p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
          Patients
        </h1>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
          <Link href="/admin/patients/create">
            Tambah Pasien
          </Link>
        </Button>
      </div>

      {/* Card */}
      <Card className="border border-slate-200 shadow-sm bg-white">
        
        <CardHeader>
          <CardTitle className="text-slate-700">
            Daftar Pasien
          </CardTitle>
        </CardHeader>

        <CardContent>

          {data.length === 0 ? (
            <div className="text-center text-sm text-slate-500 py-10">
              Belum ada data pasien
            </div>
          ) : (
            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>NIK</TableHead>
                  <TableHead>Tanggal Lahir</TableHead>
                  <TableHead>Status MCU</TableHead>
                  <TableHead className="text-right">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((patient) => (
                  <TableRow
                    key={patient.id}
                    className="hover:bg-slate-50 transition"
                  >

                    <TableCell className="font-medium text-slate-800">
                      {patient.name}
                    </TableCell>

                    <TableCell className="text-slate-600">
                      {patient.nik}
                    </TableCell>

                    <TableCell className="text-slate-600">
                      {patient.birthDate}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-medium ${getMcuStatusStyle(
                          patient.mcuStatus
                        )}`}
                      >
                        {getMcuStatusLabel(patient.mcuStatus)}
                      </span>
                    </TableCell>

                    <TableCell className="text-right space-x-2">

                      {/* Input MCU */}
                      {patient.mcuStatus === "none" && (
                        <Button size="sm" asChild>
                          <Link href={`/admin/mcu/create/${patient.id}`}>
                            Input
                          </Link>
                        </Button>
                      )}

                      {/* View/Edit MCU */}
                      {patient.mcuStatus !== "none" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-300"
                          asChild
                        >
                          <Link href={`/admin/mcu/${patient.id}`}>
                            Detail
                          </Link>
                        </Button>
                      )}

                      {/* Result */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-600 hover:bg-slate-100"
                        asChild
                      >
                        <Link href={`/result/${patient.qrCode}`}>
                          Hasil
                        </Link>
                      </Button>

                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>
          )}

        </CardContent>
      </Card>
    </div>
  )
}