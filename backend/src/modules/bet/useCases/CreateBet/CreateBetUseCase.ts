import { DTOCreateBet } from "@modules/bet/dtos/DTOCreateBet";
import { IBetRepository } from "@modules/bet/infra/IBetRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateBetUseCase {
  constructor(
    @inject("betRepository")
    private betRepository: IBetRepository,

  ) {}
  async execute({
    name,
    cpf,
    numbers,
    BetEdition_id
  }: DTOCreateBet): Promise<any> {

    const lastBatRegister = (await this.betRepository.getLastBet())?.register;
  
    const register = (lastBatRegister ?? 999) + 1;

    const createdBet = await this.betRepository.createBet({
      name,
      register,
      cpf,
      numbers,
      BetEdition_id
    })
    return createdBet;
  }
}

export { CreateBetUseCase }

