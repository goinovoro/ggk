import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import "server-only"

const SESSION_COOKIE = "session"
const EXPIRATION_TIME = 60 * 60 * 24 * 7

export type SessionPayload = {
  userId: string
  email: string
  name: string | null
  role: "ADMIN" | "DISPATCHER" | "PACKER" | "OPERATOR" | "CUSTOMER"
}

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error("AUTH_SECRET environment variable is not set")
  return new TextEncoder().encode(secret)
}

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRATION_TIME}s`)
    .sign(getSecret())

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: EXPIRATION_TIME,
    path: "/",
  })
}

export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(SESSION_COOKIE)
  if (!cookie) return null

  try {
    const { payload } = await jwtVerify(cookie.value, getSecret())
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}