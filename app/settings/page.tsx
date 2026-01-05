import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/ui/back-button"

export default async function SettingsPage() {
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
            <div className="flex items-center gap-4">
              <BackButton />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account preferences.</p>
              </div>
            </div>
            <SidebarTrigger />
          </div>

          <div className="max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your personal details and email address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <p className="p-2 bg-muted rounded-md text-sm">{user.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Role</label>
                  <p className="p-2 bg-muted rounded-md text-sm capitalize">{user.role}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
