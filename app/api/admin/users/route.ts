import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

// GET all users (admin only)
export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("halalcheck")

    const users = await db
      .collection("users")
      .find({})
      .project({ password: 0 })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ users })
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// POST create new user (admin only)
export async function POST(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, password, name, role } = await request.json()

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (role !== "user" && role !== "admin") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("halalcheck")

    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      name,
      role,
      disabled: false,
      createdAt: new Date(),
    })

    return NextResponse.json({ 
      message: "User created successfully", 
      userId: newUser.insertedId 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
