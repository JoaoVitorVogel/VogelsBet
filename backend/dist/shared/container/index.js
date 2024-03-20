"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const BetEditionRepository_1 = require("../../modules/betEdition/infra/repositories/BetEditionRepository");
tsyringe_1.container.registerSingleton("betEditionRepository", (0, tsyringe_1.delay)(() => BetEditionRepository_1.BetEditionRepository));
