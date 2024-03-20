import { IBetEditionRepository } from "@modules/betEdition/infra/IBetEditionRepository";
import { TGetBetEdition } from "@modules/betEdition/types/TCreateBetEdition";
import { TGetBetEditionReturn } from "@modules/betEdition/types/TReadBetEdition";
import { inject, injectable } from "tsyringe";


@injectable()
class ReadBetEditionUseCase {
  constructor(
    @inject("betEditionRepository")
    private betEditionRepository: IBetEditionRepository,

  ) {}
  async execute(): Promise<any> {

    const foundedEditions = await this.betEditionRepository.readBetEditions()

    return foundedEditions;
  }

  async getBetEdition({
    BetEdition_id
  }: TGetBetEdition): Promise<TGetBetEditionReturn> {

    const foundedEdition = await this.betEditionRepository.getBetEdition({BetEdition_id})

    return foundedEdition
  }
}

export { ReadBetEditionUseCase }

