"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_1 = __importDefault(require("./error"));
const auth_1 = __importDefault(require("./auth"));
const items_1 = __importDefault(require("./items"));
const router = express_1.Router();
router
    .use(auth_1.default)
    .use(items_1.default)
    .use(error_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map