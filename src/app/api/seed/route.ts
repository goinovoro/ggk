import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { hash } from "bcryptjs"

export async function GET() {
  try {
    const pw = await hash("pass123", 12)
    
    await prisma.user.upsert({
      where: { email: "admin@ggk.com" },
      update: {},
      create: { email: "admin@ggk.com", name: "Admin", password: pw, role: "ADMIN" }
    })
    
    await prisma.user.upsert({
      where: { email: "ops@ggk.com" },
      update: {},
      create: { email: "ops@ggk.com", name: "Operator", password: pw, role: "OPERATOR" }
    })
    
    await prisma.user.upsert({
      where: { email: "packer@ggk.com" },
      update: {},
      create: { email: "packer@ggk.com", name: "Packer", password: pw, role: "PACKER" }
    })

    await prisma.user.upsert({
      where: { email: "disp@ggk.com" },
      update: {},
      create: { email: "disp@ggk.com", name: "Dispatcher", password: pw, role: "DISPATCHER" }
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
