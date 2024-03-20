import { container, delay } from "tsyringe";

import { BetEditionRepository } from "../../modules/betEdition/infra/repositories/BetEditionRepository";
import { IBetEditionRepository } from "@modules/betEdition/infra/IBetEditionRepository";
import { IBetRepository } from "@modules/bet/infra/IBetRepository";
import { BetRepository } from "@modules/bet/infra/repositories/BetRepository";

container.registerSingleton<IBetEditionRepository>(
  "betEditionRepository",
  delay(() => BetEditionRepository)
);

container.registerSingleton<IBetRepository>(
  "betRepository",
  delay(() => BetRepository)
)


