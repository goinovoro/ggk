"use server"

import { hash, compare } from "bcryptjs"
import prisma from "@/lib/db"
import { createSession, deleteSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function register(prevState: { error?: string }, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password) return { error: "Email dan password wajib diisi" }
  if (password.length < 6) return { error: "Password minimal 6 karakter" }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { error: "Email sudah terdaftar" }

  const hashedPassword = await hash(password, 12)
  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  })

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })

  const roleRoutes: Record<string, string> = {
    ADMIN: "/dashboard/ops",
    DISPATCHER: "/dashboard/ops",
    PACKER: "/dashboard/ops",
    CUSTOMER: "/dashboard/customer",
    OPERATOR: "/dashboard/ops",
  }
  redirect(roleRoutes[user.role] || "/dashboard/customer")
}

export async function login(prevState: { error?: string }, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectTo = formData.get("redirect") as string

  if (!email || !password) return { error: "Email dan password wajib diisi" }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return { error: "Email atau password salah" }

    const valid = await compare(password, user.password)
    if (!valid) return { error: "Email atau password salah" }

    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    if (redirectTo && redirectTo.startsWith("/dashboard")) {
      redirect(redirectTo)
    }

    const roleRoutes: Record<string, string> = {
      ADMIN: "/dashboard/ops",
      DISPATCHER: "/dashboard/ops",
      PACKER: "/dashboard/ops",
      CUSTOMER: "/dashboard/customer",
      OPERATOR: "/dashboard/ops",
    }
    redirect(roleRoutes[user.role] || "/dashboard/customer")
  } catch (err: any) {
    if (err.message === "NEXT_REDIRECT") throw err;
    console.error("Login error:", err)
    return { error: `System Error: ${err.message}` }
  }
}

export async function logout() {
  await deleteSession()
  redirect("/")
}
