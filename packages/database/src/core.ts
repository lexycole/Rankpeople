import { prismaLogger } from "@repo/logger";
import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient({
  log: [
    {
      level: "query",
      emit: "event",
    },
    {
      level: "info",
      emit: "event",
    },
    {
      level: "warn",
      emit: "event",
    },
    {
      level: "error",
      emit: "event",
    },
  ],
});

prismaClient.$on("query", (e) => {
  prismaLogger.debug(`Query: ${e.params} ${e.duration}ms`);
});

prismaClient.$on("info", (e) => {
  prismaLogger.info(`${e.message}`);
});

prismaClient.$on("warn", (e) => {
  prismaLogger.warn(`${e.message}`);
});

prismaClient.$on("error", (e) => {
  prismaLogger.error(`${e.message}`);
});
