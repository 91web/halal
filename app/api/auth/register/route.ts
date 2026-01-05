import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    const client = await clientPromise
    const db = client.db("halalcheck")

    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    // <CHANGE> Added disabled field to user schema
    const newUser = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      name,
      role: "user",
      disabled: false,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: "User created successfully", userId: newUser.insertedId })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
