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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const v1_1 = __importDefault(require("uuid/v1"));
exports.createItem = ({ name, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name)
        throw new Error('400');
    const id = v1_1.default();
    const item = { id, name, userId };
    yield db_1.default.set(`items.${id}`, item).write();
    return item;
});
exports.getItem = ({ id, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new Error('400');
    const item = yield db_1.default.get(`items.${id}`).value();
    if (!item || item.userId !== userId)
        throw new Error('404');
    return item;
});
exports.listItems = ({ value, userId }) => {
    if (!value)
        return db_1.default.get('items').value();
    return db_1.default.get('items')
        .filter((item) => (item.userId === userId &&
        item.name.includes(value)))
        .sortBy('name')
        .take(50)
        .value();
};
//# sourceMappingURL=items.js.map