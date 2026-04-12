"use client"

import { deleteMcu } from "@/lib/mcu"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function DeleteButton({
  id,
  onDelete
}: {
  id: string
  onDelete: (id: string) => void
}) {

  const handleDelete = async () => {
    const confirmDelete = confirm("Yakin mau hapus data ini?")
    if (!confirmDelete) return

    try {
      await deleteMcu(id)

      toast.success("Data berhasil dihapus")

      // 🔥 UPDATE UI LANGSUNG
      onDelete(id)

    } catch {
      toast.error("Gagal hapus data")
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