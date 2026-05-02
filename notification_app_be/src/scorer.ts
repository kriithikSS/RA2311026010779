import { Notification } from "./types";

// weights reflect how much each type impacts a student
// placement affects career, results are academic, events are optional
const weights: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function score(n: Notification): number {
  const w = weights[n.Type] ?? 1;
  const ageMs = Date.now() - new Date(n.Timestamp).getTime();
  const ageMinutes = ageMs / 60_000;
  // recency factor drops off quickly — a 2hr old notification is much less urgent
  const recency = 1 / (1 + ageMinutes);
  return w * recency;
}
