"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

import { MCUData } from "@/types/mcu"
import { McuForm } from "@/components/admin/mcu-form"

export default function EditPage() {
  const router = useRouter()
  const params = useParams()

  const id = params.id as string

  const [data, setData] = useState<MCUData | null>(null)
  const [nik, setNik] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  // ======================
  useEffect(() => {
    const fetch = async () => {
      const { data: res, error } = await supabase
        .from("mcu")
        .select("*")
        .eq("id", id)
        .single()

      if (error || !res) {
        toast.error("Data tidak ditemukan")
        router.push("/admin/mcu")
        return
      }

      setData(res.data)
      setNik(res.nik)
      setEmail(res.email)
    }

    if (id) fetch()
  }, [id, router])

  if (!data) return <div>Loading...</div>

  // ======================
  const handleUpdate = async ({
    data,
    nik,
    email,
  }: {
    data: MCUData
    nik: string
    email: string
  }) => {
    setLoading(true)

    try {
      const { error } = await supabase
        .from("mcu")
        .update({
          nik,
          email,
          ttl: data.identitas.ttl,
          data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)

      if (error) throw error

      toast.success("Berhasil diupdate")
      router.push("/admin/mcu")

    } catch (err) {
      console.error(err)
      toast.error("Gagal update")
    } finally {
      setLoading(false)
    }
  }

  // ======================
  return (
    <McuForm
      initialData={data}
      nik={nik}
      email={email}
      onSubmit={handleUpdate}
      submitLabel={loading ? "Updating..." : "Update MCU"}
    />
  )
}