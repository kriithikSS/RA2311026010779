import { TokenResponse } from "./types";

const AUTH_URL = "http://20.207.122.201/evaluation-service/auth";

// simple in-memory cache — avoid hammering the auth endpoint on every log call
let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

function buildCredentials() {
  return {
    email: process.env.AFFORDMED_EMAIL!,
    name: process.env.AFFORDMED_NAME!,
    rollNo: process.env.AFFORDMED_ROLL_NO!,
    accessCode: process.env.AFFORDMED_ACCESS_CODE!,
    clientID: process.env.AFFORDMED_CLIENT_ID!,
    clientSecret: process.env.AFFORDMED_CLIENT_SECRET!,
  };
}

export async function getToken(): Promise<string> {
  const now = Date.now();

  // reuse cached token if it won't expire in the next 60 seconds
  if (cachedToken && now < tokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const creds = buildCredentials();

  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  });

  if (!res.ok) {
    throw new Error(`Auth request failed — status ${res.status}`);
  }

  const data: TokenResponse = await res.json();

  // expires_in is a unix timestamp in seconds
  cachedToken = data.access_token;
  tokenExpiresAt = data.expires_in * 1000;

  return cachedToken;
}
