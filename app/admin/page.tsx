"use client"

import CountUp from "react-countup"
import { Users, FileText, Clock, TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

export default function AdminDashboard() {
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

        {/* Total Patients */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Patients
            </CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-slate-800">
              <CountUp end={120} duration={1.5} />
            </p>
            <p className="text-xs text-slate-500 mt-1">
              +12 dari bulan lalu
            </p>
          </CardContent>
        </Card>

        {/* MCU Results */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              MCU Completed
            </CardTitle>
            <FileText className="h-5 w-5 text-green-600" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-slate-800">
              <CountUp end={98} duration={1.5} />
            </p>
            <p className="text-xs text-slate-500 mt-1">
              82% dari total pasien
            </p>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pending Review
            </CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-slate-800">
              <CountUp end={22} duration={1.5} />
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Perlu tindakan segera
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Extra Insight */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Progress */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-slate-600">
              Progress MCU
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: "82%" }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              82% pasien sudah selesai MCU
            </p>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm text-slate-600">
              Aktivitas Terbaru
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span>Budi - MCU selesai</span>
              <span className="text-slate-400">10:21</span>
            </div>

            <div className="flex justify-between">
              <span>Siti - Input data</span>
              <span className="text-slate-400">09:45</span>
            </div>

            <div className="flex justify-between">
              <span>Andi - Pending review</span>
              <span className="text-slate-400">08:30</span>
            </div>

          </CardContent>
        </Card>

      </div>

    </div>
  )
}