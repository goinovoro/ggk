import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { getCustomerOrders } from "@/actions/orders"
import CustomerDashboardClient from "./CustomerDashboardClient"

export const metadata: Metadata = {
  title: "Customer Portal | GGK PRINTING",
  description: "Pantau pesanan Anda dan unggah bukti pembayaran.",
}

export default async function CustomerDashboardPage() {
  const session = await verifySession()

  if (!session) {
    redirect("/login")
  }

  // Double check role
  if (session.role !== "CUSTOMER" && session.role !== "ADMIN") {
    // If not a customer or admin, they shouldn't view this specific customer portal
    redirect("/dashboard/ops")
  }

  const initialOrders = await getCustomerOrders(session.userId)

  return (
    <CustomerDashboardClient
      session={{
        userId: session.userId,
        email: session.email,
        name: session.name,
        role: session.role
      }}
      initialOrders={initialOrders}
    />
  )
}
