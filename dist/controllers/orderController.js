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
const quikdbService_1 = __importDefault(require("../services/quikdbService"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, description, status } = req.body;
        const username = req.user.username; // from JWT payload
        const record = {
            id: orderId,
            fields: [
                ['orderId', orderId],
                ['userId', username],
                ['description', description],
                ['status', status]
            ]
        };
        const result = yield quikdbService_1.default.createOrderRecord(record);
        if (result.ok) {
            res.status(201).json({ message: 'Order created successfully.' });
        }
        else {
            res.status(400).json({ error: result.err });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const orders = yield quikdbService_1.default.getAllOrderRecords();
        const start = (page - 1) * limit;
        const paginatedOrders = orders.slice(start, start + limit);
        res.json({ page, limit, data: paginatedOrders });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const order = yield quikdbService_1.default.getOrderRecord(orderId);
        if (order) {
            res.json(order);
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const { description, status } = req.body;
        const fieldsToUpdate = [];
        if (description)
            fieldsToUpdate.push(['description', description]);
        if (status)
            fieldsToUpdate.push(['status', status]);
        const result = yield quikdbService_1.default.updateOrderRecord(orderId, fieldsToUpdate);
        if (result.ok) {
            res.json({ message: 'Order updated successfully.' });
        }
        else {
            res.status(400).json({ error: result.err });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const result = yield quikdbService_1.default.deleteOrderRecord(orderId);
        if (result.ok) {
            res.json({ message: 'Order deleted successfully.' });
        }
        else {
            res.status(400).json({ error: result.err });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };
