"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBetEditionController = void 0;
const CreateBetEditionUseCase_js_1 = require("./CreateBetEditionUseCase.js");
const tsyringe_1 = require("tsyringe");
class CreateBetEditionController {
    async handle(request, response) {
        const { name, value } = request.body;
        const createBetEditionUseCase = tsyringe_1.container.resolve(CreateBetEditionUseCase_js_1.CreateBetEditionUseCase);
        const authenticatedUser = await createBetEditionUseCase.execute({
            name,
            value
        });
        return response.status(201).json(authenticatedUser);
    }
}
exports.CreateBetEditionController = CreateBetEditionController;
