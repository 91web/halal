"use client"

import { Home, History, Shield, LogOut, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import type { AuthUser } from "@/lib/auth"

export function AppSidebar({ user }: { user: AuthUser }) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-900">HalalCheck AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Home">
              <a href="/dashboard" className="flex items-center gap-3">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="History">
              <a href="/dashboard#history" className="flex items-center gap-3">
                <History className="w-5 h-5" />
                <span>My History</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {user.role === "admin" && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Admin" className="text-amber-600">
                <a href="/admin" className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span>Admin Panel</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings" className="flex items-center gap-3 text-slate-500">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <form action="/api/auth/logout" method="POST">
              <SidebarMenuButton type="submit" className="text-red-500 hover:text-red-600 w-full">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
