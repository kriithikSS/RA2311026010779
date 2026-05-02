import { Log } from "logging-middleware";
import { Notification, NotificationsApiResponse } from "./types";
import { getToken } from "logging-middleware";

const API = "http://20.207.122.201/evaluation-service/notifications";

export async function fetchNotifications(): Promise<Notification[]> {
  await Log("backend", "info", "handler", "fetching notifications from API");

  const token = await getToken();

  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    await Log("backend", "error", "handler", `notifications API returned ${res.status}`);
    throw new Error(`fetch failed with status ${res.status}`);
  }

  const data: NotificationsApiResponse = await res.json();
  await Log("backend", "info", "handler", `received ${data.notifications.length} notifications`);

  return data.notifications;
}
