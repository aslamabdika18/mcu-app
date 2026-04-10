"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

import { MCUData } from "@/types/mcu"
import { McuForm } from "@/components/admin/mcu-form"

export default function EditPage(){
  const router=useRouter()
  const {id}=useParams()

  const [data,setData]=useState<MCUData|null>(null)
  const [nik,setNik]=useState("")
  const [email,setEmail]=useState("")

  useEffect(()=>{
    const fetch=async()=>{
      const {data:res}=await supabase.from("mcu").select("*").eq("id",id).single()

      if(!res){router.push("/admin/mcu");return}

      setData(res.data)
      setNik(res.nik)
      setEmail(res.email)
    }

    fetch()
  },[id,router])

  if(!data)return<div>Loading...</div>

  const handleUpdate=async({data,nik,email}:{data:MCUData,nik:string,email:string})=>{
    const promise=(async()=>{
      const {error}=await supabase.from("mcu").update({
        nik,email,ttl:data.identitas.ttl,data
      }).eq("id",id)

      if(error) throw error
    })()

    toast.promise(promise,{
      loading:"Updating...",
      success:()=>{router.push("/admin/mcu");return"Updated"},
      error:"Error"
    })
  }

  return (
    <McuForm
      initialData={data}
      nik={nik}
      email={email}
      onSubmit={handleUpdate}
      submitLabel="Update MCU"
    />
  )
}