import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("halalcheck")

    const totalUsers = await db.collection("users").countDocuments()
    const totalAnalyses = await db.collection("history").countDocuments()
    const recentAnalyses = await db.collection("history").find().sort({ timestamp: -1 }).limit(10).toArray()

    return NextResponse.json({
      totalUsers,
      totalAnalyses,
      recentAnalyses,
    })
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 })
  }
}
