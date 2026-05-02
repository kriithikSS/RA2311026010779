export interface Notification {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

// extended version used after scoring
export interface ScoredNotification extends Notification {
  score: number;
}

export interface NotificationsApiResponse {
  notifications: Notification[];
}
