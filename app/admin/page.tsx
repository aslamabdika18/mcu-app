"use client"

import { useEffect, useState } from "react"
import CountUp from "react-countup"
import { Users, FileText, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

type MCU = {
  status: string
}

export default function AdminDashboard() {
  const [total, setTotal] = useState(0)
  const [approved, setApproved] = useState(0)
  const [pending, setPending] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("mcu").select("status")

      if (!data) return

      const totalData = data.length
      const approvedData = data.filter(i => i.status === "approved").length
      const pendingData = totalData - approvedData

      setTotal(totalData)
      setApproved(approvedData)
      setPending(pendingData)
    }

    fetchData()
  }, [])

  const percent = total > 0 ? Math.round((approved / total) * 100) : 0

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Ringkasan aktivitas sistem MCU
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Data MCU</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              <CountUp end={total} />
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">MCU Approved</CardTitle>
            <FileText className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              <CountUp end={approved} />
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Pending</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              <CountUp end={pending} />
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-slate-600">
            Progress MCU
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="text-xs text-slate-500 mt-2">
            {percent}% pasien sudah selesai MCU
          </p>
        </CardContent>
      </Card>

    </div>
  )
}