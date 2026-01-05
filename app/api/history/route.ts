import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("halalcheck")

    // Fetch only history belonging to this specific user
    const history = await db.collection("history").find({ userId: user.id }).sort({ timestamp: -1 }).toArray()

    return NextResponse.json(history)
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 })
  }
}
