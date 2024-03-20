import { TGetBetEditionReturn, TReadBetEditionReturn } from "@modules/betEdition/types/TReadBetEdition";
import { prisma } from "../../../../database/PrismaClient";
import { TCreateBetEdition, TCreateBetEditionReturn, TGetBetEdition } from "@modules/betEdition/types/TCreateBetEdition";
import { TGenerateNumbers, TGenerateNumbersReturn, TGetNumbers } from "@modules/betEdition/types/TGenerateNumbers";

class BetEditionRepository {

  async createBetEdition({
    name,
    value
  }: TCreateBetEdition): Promise<TCreateBetEditionReturn> {
    const newBetEdition = await prisma.betEdition.create({
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
    return newBetEdition;
  }

  async readBetEditions(): Promise<TReadBetEditionReturn> {
    const betEditions = await prisma.betEdition.findMany({
      select: {
        id_e: true,
        name: true,
        finish: true,
        value: true,
        numbersDrawn: true,
        status: true
      }
    })
    return betEditions
  }

  async clearDRawnNumbers() {
    const transaction = await prisma.$transaction([
      prisma.bet.deleteMany({}),
      prisma.betEdition.deleteMany({}),
    ]);

    return transaction
  }

  async getBetEdition({BetEdition_id}: TGetBetEdition): Promise<TGetBetEditionReturn> {
    const betEdition = await prisma.betEdition.findUnique({
      select: {
        id_e: true,
        name: true,
        finish: true,
        value: true,
        numbersDrawn: true,
        status: true
      },
      where: {
        id_e: BetEdition_id
      }
    })
    return betEdition
  }

  async createDrawnNumbers({
    BetEdition_id,
    numbersDrawn
  }: TGenerateNumbers): Promise<TGenerateNumbersReturn> {
    const drawnNumbers = await prisma.betEdition.update({
      where: {
        id_e: BetEdition_id
      },
      data: {
        numbersDrawn: {
          set: numbersDrawn
        }
      },
      select: {
        numbersDrawn: true,
        id_e: true
      }
    });
    return drawnNumbers;
  }

  async generateExtraDrawnNumber({
    BetEdition_id,
    numbersDrawn
  }: TGenerateNumbers): Promise<TGenerateNumbersReturn> {
    const drawnNumbers = await prisma.betEdition.update({
      where: {
        id_e: BetEdition_id
      },
      data: {
        numbersDrawn: {
          set: numbersDrawn
        }
      },
      select: {
        numbersDrawn: true,
        id_e: true
      }
    });
    return drawnNumbers;
  }
}

export { BetEditionRepository };
