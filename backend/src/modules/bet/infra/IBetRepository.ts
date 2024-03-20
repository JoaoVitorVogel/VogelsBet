
import { TCreateBet, TCreateBetReturn } from "../types/TCreateBet";
import { TReadBetReturn, TReadFirstBet } from "../types/TReadBet";


interface IBetRepository {

  getLastBet(): Promise<TReadFirstBet>;

  createBet({
    register,
    name,
    cpf,
    numbers,
    BetEdition_id
  }: TCreateBet): Promise<TCreateBetReturn>;

  readBet(): Promise<TReadBetReturn>;
  
  getWinners(): Promise<TReadBetReturn>;
}

export { IBetRepository };
