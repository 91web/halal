import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

// Simple simulation of password reset for user (In production, use email verification tokens)
export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json()

    if (!email || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("halalcheck")

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await db.collection("users").updateOne({ email }, { $set: { password: hashedPassword } })

    return NextResponse.json({ message: "Password reset successful" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
