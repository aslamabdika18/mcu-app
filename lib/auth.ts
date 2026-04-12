import { cookies } from "next/headers"

export function getUserFromCookie() {
  const cookieStore = cookies()
  const user = cookieStore.get("user")

  if (!user) return null

  try {
    return JSON.parse(user.value)
  } catch {
    return null
  }
}

export function isAdmin(user: any) {
  return user?.role === "admin"
}