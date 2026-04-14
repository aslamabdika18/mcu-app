"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const start = Date.now()

      const { data: { user } } = await supabase.auth.getUser()

      const elapsed = Date.now() - start
      const remaining = Math.max(3000 - elapsed, 0)

      // 🔥 kasih waktu spinner tampil
      setTimeout(() => {
        if (user) {
          router.replace("/admin")
        } else {
          router.replace("/login")
        }
      }, remaining)
    }

    check()
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">

      <div className="flex flex-col items-center gap-4">

        {/* MEDICAL SPINNER */}
        <div className="relative w-12 h-12">

          <div className="absolute inset-0 rounded-full border-4 border-emerald-200" />

          <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />

        </div>

        {/* TEXT */}
        <p className="text-sm font-medium text-gray-700">
          Memuat Hasil Pemeriksaan
        </p>

        <p className="text-xs text-gray-400">
          Harap tunggu sebentar...
        </p>

      </div>

    </div>
  )
}