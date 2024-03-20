import { IBetRepository } from "@modules/bet/infra/IBetRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ReadBetUseCase {
  constructor(
    @inject("betRepository")
    private betRepository: IBetRepository,

  ) {}
  async execute(): Promise<any> {

    const foundedBets = await this.betRepository.readBet();

    return foundedBets;
  }

  async getWinners(drawnNumbers): Promise<any> {

    const foundedBets = await this.betRepository.getWinners();

    const winners = foundedBets.filter((bet) => {
      const winnerNumbers = bet.numbers;
      
      return winnerNumbers.every((number) => drawnNumbers.includes(number.toString()));
    });

    

    return winners
  }
}

export { ReadBetUseCase }

