"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createMcu } from "@/lib/mcu"
import { CreateMcuDTO, MCUData } from "@/types/mcu"
import { McuForm } from "@/components/admin/mcu-form"

const defaultData: MCUData = {
  identitas:{
    nama:"-",jenisKelamin:"Laki-laki",ttl:"-",
    alamat:"-",noHp:"-",agama:"Islam",bbTb:"-",golDarah:"-"
  },
  tandaVital:{
    tekananDarah:"120/80",nadi:"70",respirasi:"20",suhu:"36.5"
  },
  pemeriksaanFisik:Object.fromEntries(
    ["kepala","wajah","mata","thtKanan","thtKiri","tonsil","thorax","gigi","thyroid","jantung","paru","abdomen","kulit","perianal","genitalia","extremitasAtas","extremitasBawah"]
    .map(k=>[k,{status:"Normal",keterangan:"-"}])
  ) as MCUData["pemeriksaanFisik"],
  kesimpulan:["Normal"],
  saran:["-"]
}

export default function CreatePage(){
  const router=useRouter()

  const handleSubmit=async({data,nik,email}:{data:MCUData,nik:string,email:string})=>{
    const dto:CreateMcuDTO={nik,email,ttl:data.identitas.ttl,data}

    const promise=createMcu(dto)

    toast.promise(promise,{
      loading:"Menyimpan...",
      success:()=>{router.push("/admin/mcu");return"Berhasil"},
      error:"Gagal"
    })
  }

  return (
    <McuForm
      initialData={defaultData}
      nik=""
      email=""
      onSubmit={handleSubmit}
      submitLabel="Simpan MCU"
    />
  )
}