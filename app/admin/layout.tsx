"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"

import { AdminSidebar } from "@/components/admin/app-sidebar"

import { toast } from "sonner"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  // 🔥 AUTH GUARD GLOBAL
  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user || user.email !== "admin@gmail.com") {
        router.replace("/login")
      }
    }

    check()

    // 🔥 LISTENER (biar logout langsung ke-detect)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.replace("/login")
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success("Logout berhasil")
    router.replace("/login")
  }

  return (
    <SidebarProvider>

      <AdminSidebar />

      <SidebarInset>

        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center">
            <SidebarTrigger />
            <h1 className="ml-4 font-semibold">
              Admin Panel
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </header>

        <main className="p-6">
          {children}
        </main>

      </SidebarInset>

    </SidebarProvider>
  )
}