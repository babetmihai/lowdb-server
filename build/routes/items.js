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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemService = __importStar(require("../services/items"));
const express_1 = require("express");
const router = express_1.Router();
router.post('/items', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const { userId } = req.locals;
        const item = yield itemService.createItem({ name, userId });
        res.status(200).json(item);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/items', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value } = req.query;
        const { userId } = req.locals;
        const items = yield itemService.listItems({ value, userId });
        res.status(200).json(items);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/items/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req.locals;
        const item = yield itemService.getItem({ id, userId });
        res.status(200).json(item);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=items.js.map