import { TokenResponse } from "./types";

const AUTH_URL = "http://20.207.122.201/evaluation-service/auth";

let cachedToken: string | null = null;
let expiresAt: number = 0;

export async function getToken(): Promise<string> {
  // reuse if still valid
  if (cachedToken && Date.now() < expiresAt - 60000) {
    return cachedToken;
  }

  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.AFFORDMED_EMAIL!,
      name: process.env.AFFORDMED_NAME!,
      rollNo: process.env.AFFORDMED_ROLL_NO!,
      accessCode: process.env.AFFORDMED_ACCESS_CODE!,
      clientID: process.env.AFFORDMED_CLIENT_ID!,
      clientSecret: process.env.AFFORDMED_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    throw new Error(`auth failed with status ${res.status}`);
  }

  const data: TokenResponse = await res.json();
  cachedToken = data.access_token;
  expiresAt = data.expires_in * 1000;

  return cachedToken;
}
