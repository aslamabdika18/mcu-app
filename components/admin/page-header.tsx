// components/page-header.tsx

"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PageHeader({
  title,
  description,
  showBack = false
}: {
  title: string
  description?: string
  showBack?: boolean
}) {
  const router = useRouter()

  return (
    <div className="space-y-2">

      {showBack && (
        <Button
          variant="ghost"
          className="px-0 text-slate-600 hover:text-slate-900"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      )}

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
          {title}
        </h1>

        {description && (
          <p className="text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

    </div>
  )
}