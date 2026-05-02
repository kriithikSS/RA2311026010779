import { Notification } from "./types";

const weights: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function score(n: Notification): number {
  const w = weights[n.Type] ?? 1;
  const ageMs = Date.now() - new Date(n.Timestamp).getTime();
  const ageMinutes = ageMs / 60000;
  const recency = 1 / (1 + ageMinutes);
  return w * recency;
}
