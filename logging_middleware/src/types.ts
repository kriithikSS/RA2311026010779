export type Stack = "backend" | "frontend";

export type Level = "debug" | "info" | "warn" | "error" | "fatal";

export type Package =
  // backend-only
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service"
  // frontend-only
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  // shared
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

export interface AuthCredentials {
  email: string;
  name: string;
  rollNo: string;
  accessCode: string;
  clientID: string;
  clientSecret: string;
}

export interface TokenResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}
