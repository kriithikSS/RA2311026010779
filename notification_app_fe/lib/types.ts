export type NotifType = "Placement" | "Result" | "Event"

export interface Notification {
  ID: string
  Type: NotifType
  Message: string
  Timestamp: string
}

export interface ScoredNotification extends Notification {
  score: number
}
