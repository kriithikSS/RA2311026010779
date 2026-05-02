import "dotenv/config";
import { Log } from "logging-middleware";
import { fetchNotifications } from "./fetchNotifications";
import { MinHeap } from "./priorityQueue";
import { score } from "./scorer";
import { ScoredNotification } from "./types";

const TOP_N = 10;

async function main() {
  await Log("backend", "info", "service", `starting, finding top ${TOP_N}`);

  const notifications = await fetchNotifications();

  const heap = new MinHeap<ScoredNotification>((a, b) => a.score - b.score);

  for (const n of notifications) {
    const s = score(n);
    if (heap.size < TOP_N) {
      heap.push({ ...n, score: s });
    } else if (heap.top() && s > heap.top()!.score) {
      heap.pop();
      heap.push({ ...n, score: s });
    }
  }

  const result = heap.values().sort((a, b) => b.score - a.score);

  await Log("backend", "info", "service", `done, got top ${TOP_N}`);

  console.log(`\n=== Top ${TOP_N} Notifications ===\n`);
  result.forEach((n, i) => {
    console.log(`${i + 1}. [${n.Type}] ${n.Message} | score: ${n.score.toFixed(4)}`);
  });
}

main().catch(async (err) => {
  await Log("backend", "fatal", "service", err.message);
  console.error(err);
  process.exit(1);
});
