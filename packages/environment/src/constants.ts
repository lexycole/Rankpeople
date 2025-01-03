import { isDocker } from "./isDocker";
import { OnServer } from "./onServer";

export const BUILD_MODE = (process.env.NODE_ENV || "development") as
  | "development"
  | "production";

export const __prod__ = BUILD_MODE === "production";
export const PACKAGE_VERSION = process.env.npm_package_version;

export const COOKIE_NAME = process.env.COOKIE_NAME || "name";
export const COOKIE_SECRET = process.env.COOKIE_SECRET || "secret";

export const REDIS_HOST = process.env.REDIS_HOST || "redis://redis:6379";
export const ON_SERVER = OnServer();

export const DOCKER_ENV = isDocker();

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api";
export const FRONTEND_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
