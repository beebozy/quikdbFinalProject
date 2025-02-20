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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const quikdbService_1 = __importDefault(require("../services/quikdbService"));
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const record = {
            id: username,
            fields: [
                ['username', username],
                ['email', email],
                ['password', hashedPassword]
            ]
        };
        const result = yield quikdbService_1.default.createUserRecord(record);
        if (result) {
            res.status(201).json({ message: 'User registered successfully.' });
        }
        else {
            res.status(400).json({ error: result.err });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, password } = req.body;
        const userRecord = yield quikdbService_1.default.getUserRecord(username);
        if (!userRecord) {
            return res.status(401).json({ error: 'User not found' });
        }
        const storedPassword = (_a = userRecord.fields.find(field => field[0] === 'password')) === null || _a === void 0 ? void 0 : _a[1];
        if (!storedPassword || !(yield bcryptjs_1.default.compare(password, storedPassword))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = { register, login };
