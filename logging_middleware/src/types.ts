export type Stack = "backend" | "frontend";

export type Level = "debug" | "info" | "warn" | "error" | "fatal";

export type Package =
  | "cache" | "controller" | "cron_job" | "db" | "domain"
  | "handler" | "repository" | "route" | "service"
  | "api" | "component" | "hook" | "page" | "state" | "style"
  | "auth" | "config" | "middleware" | "utils";

export interface TokenResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}
