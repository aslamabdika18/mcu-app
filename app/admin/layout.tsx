import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"

import { AdminSidebar } from "@/components/admin/app-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <SidebarProvider>

      <AdminSidebar />

      <SidebarInset>

        {/* Topbar */}
        <header className="flex h-16 items-center border-b px-6">

          <SidebarTrigger />

          <h1 className="ml-4 font-semibold">
            Admin Panel
          </h1>

        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>

      </SidebarInset>

    </SidebarProvider>
  )
}