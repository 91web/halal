import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import { HistoryTable } from "@/components/dashboard/history-table"
import { AnalysisInput } from "@/components/dashboard/analysis-input"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default async function DashboardPage() {
  const user = await getAuthUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <AppSidebar user={user} />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">
                Assalamu Alaikum, {user.email.split("@")[0]}
              </h1>
              <p className="text-muted-foreground mt-1">Check your ingredients for Halal compliance.</p>
            </div>
            <SidebarTrigger />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <AnalysisInput />
            <HistoryTable />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
