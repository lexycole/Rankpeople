import { PrismaClient } from "@prisma/client";
export declare const prismaClient: PrismaClient<{
    log: ({
        level: "query";
        emit: "event";
    } | {
        level: "info";
        emit: "event";
    } | {
        level: "warn";
        emit: "event";
    } | {
        level: "error";
        emit: "event";
    })[];
}, "error" | "info" | "query" | "warn", import("@prisma/client/runtime/library").DefaultArgs>;
//# sourceMappingURL=core.d.ts.map