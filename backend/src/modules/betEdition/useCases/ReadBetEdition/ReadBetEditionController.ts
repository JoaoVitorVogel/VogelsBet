import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadBetEditionUseCase } from "./ReadBetEditionUseCase";

class ReadBetEditionController {
  async handle(request: Request, response: Response): Promise<Response> {

    const readBetEditionUseCase = container.resolve(ReadBetEditionUseCase);

    const foundedEditions = await readBetEditionUseCase.execute();

    return response.status(201).json(foundedEditions);
  }

  async getBetEdition(request: Request, response: Response): Promise<Response> {
    const { BetEdition_id } = request.body;

    const readBetEditionUseCase = container.resolve(ReadBetEditionUseCase);

    const foundedEdition = await readBetEditionUseCase.getBetEdition({BetEdition_id});

    return response.status(201).json(foundedEdition);
  }
}

export { ReadBetEditionController };
