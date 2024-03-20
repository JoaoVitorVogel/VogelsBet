import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://vogelsbet_owner:s24YIxeXzoCO@ep-restless-poetry-a4t03b3w.us-east-1.aws.neon.tech/vogelsbet?sslmode=require",
    },
  },
});

export { prisma };
