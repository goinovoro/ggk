import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import OpsDashboardClient from "./OpsDashboardClient"

export const metadata: Metadata = {
  title: "Ops Board | GGK PRINTING",
  description: "Sistem Pemantauan Alur Kerja Terintegrasi Giat Gerak Kreasi",
}

export default async function OpsDashboardPage() {
  const session = await verifySession()

  if (!session) {
    redirect("/login")
  }

  // Redirect customer to customer portal
  if (session.role === "CUSTOMER") {
    redirect("/dashboard/customer")
  }

  return (
    <OpsDashboardClient
      initialRole={session.role}
      userName={session.name || session.email}
    />
  )
}
