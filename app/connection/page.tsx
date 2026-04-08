"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function HomePage() {

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("test")
        .select("*")

      console.log(data, error)
    }

    getData()
  }, [])

  return <div>Connected Supabase</div>
}