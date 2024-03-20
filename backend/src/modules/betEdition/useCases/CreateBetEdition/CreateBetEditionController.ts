import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBetEditionUseCase } from "./CreateBetEditionUseCase";

class CreateBetEditionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, value } = request.body;

    const createBetEditionUseCase = container.resolve(CreateBetEditionUseCase);

    const betEdition = await createBetEditionUseCase.execute({
      name,
      value
    });

    return response.status(201).json(betEdition);
  }

  async clearEditions(request: Request, response: Response): Promise<Response> {

    const createBetEditionUseCase = container.resolve(CreateBetEditionUseCase);

    const clener = await createBetEditionUseCase.clearEditions()

    return response.status(201).json(clener);
  }


  
}

export { CreateBetEditionController };
