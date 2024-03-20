import { Request, Response } from "express";
import { container } from "tsyringe";
import { GenerateDrawnNumbersUseCase } from "./GenereteDrawnNumbersUseCase";

class GenerateDrawnNumbersController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { BetEdition_id, type } = request.body;
    const generateDrawnNumbersUseCase = container.resolve(GenerateDrawnNumbersUseCase);
    let DrawnNumbers: any

    if(type == "save"){
        const numbersDrawn = await generateDrawnNumbersUseCase.getDrawnNumbers()
        DrawnNumbers = await generateDrawnNumbersUseCase.saveDrawnNumbers({
            BetEdition_id,
            numbersDrawn
        });
    }
    else{
        DrawnNumbers = await generateDrawnNumbersUseCase.getDrawnNumbers();
    }
    
    return response.status(201).json(DrawnNumbers);
  }

  async generateExtraNumber(request: Request, response: Response): Promise<Response> {
    const generateDrawnNumbersUseCase = container.resolve(GenerateDrawnNumbersUseCase);
    const { BetEdition_id } = request.body;

    const DrawnNumbers = await generateDrawnNumbersUseCase.saveExtraDrawnNumber({
      BetEdition_id
    });

    return response.status(201).json(DrawnNumbers);

  }
}

export { GenerateDrawnNumbersController };
