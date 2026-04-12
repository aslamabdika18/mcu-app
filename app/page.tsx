"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        router.replace("/admin")
      } else {
        router.replace("/login")
      }
    }

    check()
  }, [router])

  return <div>Loading...</div>
}