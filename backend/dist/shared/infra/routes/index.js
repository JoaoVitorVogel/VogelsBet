"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const CreateBetEditionController_1 = require("@modules/betEdition/useCases/CreateBetEdition/CreateBetEditionController");
const express_1 = require("express");
const createBetEditionController = new CreateBetEditionController_1.CreateBetEditionController();
const router = (0, express_1.Router)();
exports.router = router;
router.post("/betEdition/create", createBetEditionController.handle);
