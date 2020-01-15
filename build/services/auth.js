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
const { privateKey } = process.env;
const v1_1 = __importDefault(require("uuid/v1"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
exports.createUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password)
        throw new Error('400');
    const existing = yield exports.getUserByEmail({ email });
    if (existing)
        throw new Error('400');
    const id = v1_1.default();
    const hash = yield bcrypt_1.default.hash(password, 10);
    const user = { id, email, hash };
    yield db_1.default.set(`users.${id}`, user).write();
    return user;
});
exports.getUserByEmail = ({ email }) => {
    return db_1.default.get('users')
        .find({ email })
        .value();
};
exports.verifyToken = ({ token }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token)
        throw new Error('401');
    const { userId } = yield jsonwebtoken_1.default.verify(token, privateKey);
    if (!userId)
        throw new Error('401');
    return { userId };
});
exports.createToken = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password)
        throw new Error('400');
    const user = yield exports.getUserByEmail({ email });
    const authenticated = yield bcrypt_1.default.compare(password, user.hash);
    if (!authenticated)
        throw new Error('401');
    return jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email
    }, privateKey);
});
//# sourceMappingURL=auth.js.map