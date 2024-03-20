import { TReadBetReturn, TReadFirstBet } from "@modules/bet/types/TReadBet";
import { prisma } from "../../../../database/PrismaClient";
import { TCreateBet, TCreateBetReturn } from "@modules/bet/types/TCreateBet";

class BetRepository {
  async createBet({
    register,
    name,
    cpf,
    numbers,
    BetEdition_id
  }: TCreateBet): Promise<TCreateBetReturn> {
    const newBet = await prisma.bet.create({
      data: {
        register,
        name,
        cpf,
        numbers,
        BetEdition_id
      }
    });
    return newBet;
  }

  async readBet(): Promise<TReadBetReturn> {

    const bets = await prisma.bet.findMany({
      select: {
        register: true,
        name: true,
        cpf: true,
        numbers: true,
        BetEdition_id: true
      }
    })

    return bets
  }

  async getLastBet(): Promise<TReadFirstBet> {
    const bet = await prisma.bet.findFirst({
      select: {
        register: true,
        name: true,
        cpf: true,
        numbers: true,
        BetEdition_id: true
      },
      orderBy: {
        register: 'desc'
      }
    });
    
    return bet;
  }

  async getWinners(): Promise<TReadBetReturn> {

    const bets = await prisma.bet.findMany({
      select: {
        register: true,
        name: true,
        cpf: true,
        numbers: true,
        BetEdition_id: true
      },
      orderBy: {
        name: "asc"
      }
    })
    
    return bets
  }
}

export { BetRepository };
