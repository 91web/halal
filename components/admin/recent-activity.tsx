"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface RecentAnalysis {
  _id: string
  ingredient: string
  analysis: {
    status: string
  }
  timestamp: string
}

export function RecentActivity() {
  const [activities, setActivities] = useState<RecentAnalysis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.recentAnalyses) setActivities(data.recentAnalyses)
        setLoading(false)
      })
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "halal":
        return "bg-green-100 text-green-800"
      case "haram":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Platform Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="text-sm text-slate-500">Loading activity...</div>
          ) : activities.length > 0 ? (
            activities.map((activity) => (
              <div
                key={activity._id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 shadow-sm"
              >
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900 capitalize">{activity.ingredient}</p>
                  <p className="text-xs text-slate-500">{format(new Date(activity.timestamp), "MMM d, HH:mm")}</p>
                </div>
                <Badge variant="outline" className={getStatusColor(activity.analysis.status)}>
                  {activity.analysis.status}
                </Badge>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-500 text-center py-4">No recent activity.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
