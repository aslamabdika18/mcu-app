"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  FileText
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "MCU Records",
    url: "/admin/mcu",
    icon: FileText,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">

      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupLabel>
            MCU Admin
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton asChild>

                    <Link href={item.url}>

                      <item.icon />

                      <span>{item.title}</span>

                    </Link>

                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

    </Sidebar>
  )
}