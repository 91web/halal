import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AdminStats } from "@/components/admin/admin-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { UserManagement } from "@/components/admin/user-management"

export default async function AdminPage() {
  const user = await getAuthUser()

  if (!user || user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <AppSidebar user={user} />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Governance</h1>
              <p className="text-muted-foreground mt-1">Monitor platform activity and compliance standards.</p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="space-y-8">
            <AdminStats />
            <UserManagement />
            <RecentActivity />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
