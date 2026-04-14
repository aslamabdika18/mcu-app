"use client"

import { useEffect, useState } from "react"
import { getMcuByToken } from "@/lib/mcu"
import { McuRecord } from "@/types/mcu"
import { useParams } from "next/navigation"
import McuResultView from "@/components/McuResultView"

export default function ResultPage() {
  const params = useParams()
  const token = params.token as string

  const [record, setRecord] = useState<McuRecord | null>(null)

  useEffect(() => {
    getMcuByToken(token).then(setRecord)
  }, [token])

  if (!record) {
    return <div className="p-10 text-center">Loading...</div>
  }

  const handleDownloadPdf = async () => {
    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "hasil-mcu.pdf"
    a.click()
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <button
        onClick={handleDownloadPdf}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download PDF
      </button>

      <McuResultView record={record} />

    </div>
  )
}