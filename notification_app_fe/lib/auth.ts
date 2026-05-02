// server-side only — handles auth token with caching
let cachedToken: string | null = null
let tokenExp = 0

export async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExp - 60000) return cachedToken

  const res = await fetch("http://20.207.122.201/evaluation-service/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.AFFORDMED_EMAIL,
      name: process.env.AFFORDMED_NAME,
      rollNo: process.env.AFFORDMED_ROLL_NO,
      accessCode: process.env.AFFORDMED_ACCESS_CODE,
      clientID: process.env.AFFORDMED_CLIENT_ID,
      clientSecret: process.env.AFFORDMED_CLIENT_SECRET,
    }),
  })

  const data = await res.json()
  cachedToken = data.access_token
  tokenExp = data.expires_in * 1000
  return cachedToken!
}
