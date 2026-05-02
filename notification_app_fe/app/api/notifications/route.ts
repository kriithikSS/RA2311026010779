import { NextRequest, NextResponse } from "next/server"
import { getToken } from "@/lib/auth"
import { Log } from "@/lib/logger"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  await Log("frontend", "info", "api", "fetching notifications")

  try {
    const token = await getToken()

    const params = new URLSearchParams()
    if (searchParams.get("page")) params.set("page", searchParams.get("page")!)
    if (searchParams.get("limit")) params.set("limit", searchParams.get("limit")!)
    if (searchParams.get("notification_type")) params.set("notification_type", searchParams.get("notification_type")!)

    const res = await fetch(
      `http://20.207.122.201/evaluation-service/notifications?${params}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (!res.ok) {
      await Log("frontend", "error", "api", `API returned ${res.status}`)
      return NextResponse.json({ error: "upstream error" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    await Log("frontend", "error", "api", err.message)
    return NextResponse.json({ error: "server error" }, { status: 500 })
  }
}
