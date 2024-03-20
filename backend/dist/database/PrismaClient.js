"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: "postgresql://vogelsbet_owner:s24YIxeXzoCO@ep-restless-poetry-a4t03b3w.us-east-1.aws.neon.tech/vogelsbet?sslmode=require",
        },
    },
});
exports.prisma = prisma;
