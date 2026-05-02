import { Stack, Level, Package } from "./types";
import { getToken } from "./auth";

const LOG_URL = "http://20.207.122.201/evaluation-service/logs";

export async function Log(
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  try {
    const token = await getToken();

    const res = await fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    if (!res.ok) {
      process.stderr.write(`log failed, status ${res.status}\n`);
    }
  } catch (err) {
    // just swallow it, dont want logging to crash the app
    process.stderr.write(`log error: ${(err as Error).message}\n`);
  }
}
