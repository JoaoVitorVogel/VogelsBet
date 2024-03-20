import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBetUseCase } from "./CreateBetUseCase";

class CreateBetController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, numbers, BetEdition_id  } = request.body;

    const createBetUseCase = container.resolve(CreateBetUseCase);

    const bet = await createBetUseCase.execute({
        name,
        cpf,
        numbers,
        BetEdition_id
    });

    return response.status(201).json(bet);
  }
}

export { CreateBetController };
