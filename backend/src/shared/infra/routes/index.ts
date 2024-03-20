import { CreateBetController } from "@modules/bet/useCases/CreateBet/CreateBetController";
import { GenerateDrawnNumbersController } from "@modules/betEdition/useCases/GenerateDrawnNumbers/GenerateDrawnNumbersController"; 
import { ReadBetController } from "@modules/bet/useCases/ReadBet/ReadBetController";
import { CreateBetEditionController } from "@modules/betEdition/useCases/CreateBetEdition/CreateBetEditionController";
import { ReadBetEditionController } from "@modules/betEdition/useCases/ReadBetEdition/ReadBetEditionController";
import { Router } from "express";
import { getRandomValues } from "crypto";

const createBetEditionController = new CreateBetEditionController();
const readBetEditionController = new ReadBetEditionController();
const createBetController = new CreateBetController();
const readBetController = new ReadBetController();
const generatedNumbers = new GenerateDrawnNumbersController();

const router = Router();

router.post("/betEdition/create",
createBetEditionController.handle)

router.get("/betEditions/read",
readBetEditionController.handle)

router.get("/betEdition/get",
readBetEditionController.getBetEdition)

router.delete("/betEdition/clear",
createBetEditionController.clearEditions)


router.post("/bet/create",
createBetController.handle)

router.get("/bet/read",
readBetController.handle)

router.get("/bet/read/winners",
readBetController.searchWinners)

router.get("/bet/read/numbers",
readBetController.searchBetNumbers)


router.post("/numbers/generate",
generatedNumbers.handle)

router.post("/numbers/generate/extra",
generatedNumbers.generateExtraNumber)



export { router };
