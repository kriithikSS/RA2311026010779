import { Notification, ScoredNotification } from "./types"

const weights: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
}

// same formula as backend - weight * recency decay
function calcScore(n: Notification): number {
  const w = weights[n.Type] ?? 1
  const ageMin = (Date.now() - new Date(n.Timestamp).getTime()) / 60000
  return w * (1 / (1 + ageMin))
}

export function getTopN(notifs: Notification[], n: number): ScoredNotification[] {
  return notifs
    .map(notif => ({ ...notif, score: calcScore(notif) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
}
