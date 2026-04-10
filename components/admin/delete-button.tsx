"use client"

import { useRouter } from "next/navigation"
import { deleteMcu } from "@/lib/mcu"
import { Button } from "@/components/ui/button"

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmDelete = confirm("Yakin mau hapus data ini?")

    if (!confirmDelete) return

    try {
      await deleteMcu(id)

      alert("Data berhasil dihapus")

      router.refresh() // reload data table
    } catch (err) {
      alert("Gagal hapus data")
    }
  }

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
    >
      Hapus
    </Button>
  )
}