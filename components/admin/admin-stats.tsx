"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BarChart3, ShieldCheck, Activity } from "lucide-react"

export function AdminStats() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
  }, [])

  const statCards = [
    { title: "Total Users", value: stats?.totalUsers || 0, icon: Users, color: "text-blue-600" },
    { title: "Total Analyses", value: stats?.totalAnalyses || 0, icon: BarChart3, color: "text-green-600" },
    { title: "Compliance Rating", value: "98.2%", icon: ShieldCheck, color: "text-emerald-600" },
    { title: "AI Precision", value: "0.99", icon: Activity, color: "text-purple-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{card.title}</CardTitle>
            <card.icon className={`w-4 h-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
