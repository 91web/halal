import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import clientPromise from "@/lib/mongodb"
import { createToken } from "@/lib/auth"

// <CHANGE> Added hardcoded admin credentials
const ADMIN_EMAIL = "admin@gmail.com"
const ADMIN_PASSWORD = "admin123"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // <CHANGE> Check for hardcoded admin credentials first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = await createToken({
        id: "admin-hardcoded",
        email: ADMIN_EMAIL,
        role: "admin",
      })

      const cookieStore = await cookies()
      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })

      return NextResponse.json({
        user: { id: "admin-hardcoded", email: ADMIN_EMAIL, name: "System Admin", role: "admin" },
      })
    }

    const client = await clientPromise
    const db = client.db("halalcheck")

    const user = await db.collection("users").findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // <CHANGE> Check if user account is disabled
    if (user.disabled) {
      return NextResponse.json({ error: "Account disabled due to policy violations" }, { status: 403 })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await createToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    const cookieStore = await cookies()
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return NextResponse.json({
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
