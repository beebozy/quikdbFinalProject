"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orderController_1 = __importDefault(require("../controllers/orderController"));
const router = express_1.Router();
const JWT_SECRET_KEY = process.env.JWT_SECRET || 'Oxbeebozy';
// JWT middleware to protect endpoints
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
// Create Order
router.post('/', authenticateToken, orderController_1.default.createOrder);
// Get all Orders with simple pagination
router.get('/', authenticateToken, orderController_1.default.getAllOrders);
// Get Order by ID
router.get('/:id', authenticateToken, orderController_1.default.getOrderById);
// Update Order
router.put('/:id', authenticateToken, orderController_1.default.updateOrder);
// Delete Order
router.delete('/:id', authenticateToken, orderController_1.default.deleteOrder);
exports.default = router;
