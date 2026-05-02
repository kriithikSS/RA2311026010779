import { getToken } from "./auth"

type Stack = "frontend" | "backend"
type Level = "debug" | "info" | "warn" | "error" | "fatal"
type Pkg = "api" | "component" | "hook" | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils"

export async function Log(stack: Stack, level: Level, pkg: Pkg, msg: string) {
  try {
    const token = await getToken()
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message: msg }),
    })
  } catch (e) {
    // dont crash the app just because a log failed
    console.error("log error:", e)
  }
}
