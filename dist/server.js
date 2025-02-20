"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const orders_1 = __importDefault(require("./routes/orders"));
const quikdbService_1 = __importDefault(require("./services/quikdbService"));
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
// Initialize QuikDB (e.g., connect and optionally create required schemas)
quikdbService_1.default.init().then(() => {
    console.log('QuikDB initialized.');
}).catch(err => {
    console.error('Error initializing QuikDB:', err);
});
app.use('/auth', auth_1.default);
app.use('/orders', orders_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
