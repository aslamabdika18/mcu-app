"use client";

import { useEffect, useState } from "react";
import { getMcuByToken } from "@/lib/mcu";
import { McuRecord } from "@/types/mcu";
import { useParams } from "next/navigation";
import McuResultView from "@/components/McuResultView";

export default function ResultPage() {
  const params = useParams();
  const token = params.token as string;

  const [record, setRecord] = useState<McuRecord | null>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMcuByToken(token).then(setRecord);
  }, [token]);

  if (!record) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const handleDownloadPdf = async () => {
    if (loading) return // 🔥 block double click

    try {
      setLoading(true)

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

      URL.revokeObjectURL(url) // 🔥 bersihin memory
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={handleDownloadPdf}
        disabled={loading}
        className="
    px-5 py-2.5 
    rounded-lg 
    text-white 
    font-medium 
    bg-linear-to-r from-blue-600 to-indigo-600
    hover:from-blue-700 hover:to-indigo-700
    active:scale-[0.98]
    transition-all duration-200
    shadow-sm hover:shadow-md
    disabled:opacity-50 disabled:cursor-not-allowed
  "
      >
        {loading ? "Downloading..." : "Download PDF"}
      </button>

      <McuResultView record={record} />
    </div>
  );
}
