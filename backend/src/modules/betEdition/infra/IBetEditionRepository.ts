
import { TCreateBetEdition, TCreateBetEditionReturn, TGetBetEdition } from "../types/TCreateBetEdition";
import { TGenerateNumbers, TGenerateNumbersReturn } from "../types/TGenerateNumbers";
import { TGetBetEditionReturn, TReadBetEditionReturn } from "../types/TReadBetEdition";

interface IBetEditionRepository {
  createBetEdition({
    name,
    value
  }: TCreateBetEdition): Promise<TCreateBetEditionReturn>;

  readBetEditions(): Promise<TReadBetEditionReturn>;

  getBetEdition({
    BetEdition_id
  }: TGetBetEdition): Promise<TGetBetEditionReturn>;

  createDrawnNumbers({
    BetEdition_id,
    numbersDrawn
  }: TGenerateNumbers): Promise<TGenerateNumbersReturn>;

  generateExtraDrawnNumber({
    BetEdition_id,
    numbersDrawn
  }: TGenerateNumbers): Promise<TGenerateNumbersReturn>;

  clearDRawnNumbers()
}

export { IBetEditionRepository };
