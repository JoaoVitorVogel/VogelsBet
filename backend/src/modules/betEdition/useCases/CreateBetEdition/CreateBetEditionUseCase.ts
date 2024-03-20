import { DTOCreateBetEdition } from "@modules/betEdition/dtos/DTOCreateBetEdition";
import { IBetEditionRepository } from "@modules/betEdition/infra/IBetEditionRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateBetEditionUseCase {
  constructor(
    @inject("betEditionRepository")
    private betEditionRepository: IBetEditionRepository,

  ) {}
  async execute({
    name,
    value
  }: DTOCreateBetEdition): Promise<any> {

    const createdEdition = await this.betEditionRepository.createBetEdition({
      name,
      value,
    })
    return createdEdition;
  }

  async clearEditions() {

    const createdEdition = await this.betEditionRepository.clearDRawnNumbers()
    return createdEdition;
  }
}

export { CreateBetEditionUseCase }

