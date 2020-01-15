"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
const authService = __importStar(require("../services/auth"));
const express_1 = require("express");
const router = express_1.Router();
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield authService.createToken({ email, password });
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
}));
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = get_1.default(req, 'headers.authorization', '').replace('Bearer ', '');
        const { userId } = yield authService.verifyToken({ token });
        req.locals = Object.assign(Object.assign({}, req.locals), { userId });
        next();
    }
    catch (error) {
        next(error);
    }
}));
router.post('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authService.createUser({ email, password });
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=auth.js.map