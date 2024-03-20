import { DTODrawnExtraNumber, DTODrawnNumbers } from "@modules/betEdition/dtos/DTODrawnNumbers";
import { IBetEditionRepository } from "@modules/betEdition/infra/IBetEditionRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class GenerateDrawnNumbersUseCase {
  constructor(
    @inject("betEditionRepository")
    private betEditionRepository: IBetEditionRepository,

  ) {}
  async saveDrawnNumbers({
    BetEdition_id,
    numbersDrawn
  }: DTODrawnNumbers): Promise<any> {

    const drawnNumbers = await this.betEditionRepository.createDrawnNumbers({
        BetEdition_id,
        numbersDrawn
    })

    return drawnNumbers;
  }

  async saveExtraDrawnNumber({
    BetEdition_id,
  }: DTODrawnExtraNumber): Promise<any> {

    let newNumber = Math.floor(Math.random() * 50) + 1

    const oldNumbers = await (await this.betEditionRepository.getBetEdition({
      BetEdition_id
    })).numbersDrawn

    while(oldNumbers.includes(newNumber)){
      newNumber = Math.floor(Math.random() * 50) + 1
    }

    const numbersDrawn = await (await this.betEditionRepository.getBetEdition({
      BetEdition_id
    })).numbersDrawn.concat(newNumber)

    const drawnNumbers = await this.betEditionRepository.generateExtraDrawnNumber({
      BetEdition_id,
      numbersDrawn
    })

    return drawnNumbers
  }

  async getDrawnNumbers(): Promise<number[]> {
    const numbers: number[] = [];
    while (numbers.length < 5) {
      const randomNumber = Math.floor(Math.random() * 50) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }
}

export { GenerateDrawnNumbersUseCase }

