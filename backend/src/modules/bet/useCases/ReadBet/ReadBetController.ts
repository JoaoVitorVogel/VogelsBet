import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadBetUseCase } from "./ReadBetUseCase";

class ReadBetController {
    async handle(request: Request, response: Response): Promise<Response> {

        const readBetUseCase = container.resolve(ReadBetUseCase);
    
        const foundedBets = await readBetUseCase.execute();
    
        return response.status(201).json(foundedBets);
      }

    async searchWinners(request: Request, response: Response): Promise<Response> {
      const { drawnNumbers  } = request.query;

      const readBetUseCase = container.resolve(ReadBetUseCase);

      const winners = await readBetUseCase.getWinners(drawnNumbers);

      return response.status(201).json(winners)
    }

    async searchBetNumbers(request: Request, response: Response): Promise<Response> {

      const readBetUseCase = container.resolve(ReadBetUseCase);

      const numbers = await readBetUseCase.getBetNumbers()

      return response.status(201).json(numbers)
    }
}

export { ReadBetController };
