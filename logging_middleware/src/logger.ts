import { Stack, Level, Package } from "./types";
import { getToken } from "./auth";

const LOG_URL = "http://20.207.122.201/evaluation-service/logs";

/**
 * Send a structured log entry to the evaluation server.
 * A failed log won't throw — it just prints to stderr so the app keeps running.
 */
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
      process.stderr.write(`[logger] server returned ${res.status} for log entry\n`);
    }
  } catch (err) {
    // intentionally not re-throwing — logging should never crash the app
    process.stderr.write(`[logger] failed to send log: ${(err as Error).message}\n`);
  }
}
