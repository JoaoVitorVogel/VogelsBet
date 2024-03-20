"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetEditionRepository = void 0;
const PrismaClient_1 = require("../../../../database/PrismaClient");
class BetEditionRepository {
    async createBetEdition({ name, value }) {
        const newUser = await PrismaClient_1.prisma.betEdition.create({
            data: {
                name,
                value
            },
            select: {
                id_e: true,
                name: true,
                value: true
            }
        });
        return newUser;
    }
}
exports.BetEditionRepository = BetEditionRepository;
