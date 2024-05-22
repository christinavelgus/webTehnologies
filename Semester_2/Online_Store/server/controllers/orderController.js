const { Order, OrderItem, Device, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class OrderController {
    // Create a new order
    async create(req, res, next) {
        try {
            const { userEmail, items, status } = req.body;
            console.log("\n\n\n" + req.body + "\n\n\n")
            // Create the order
            const order = await Order.create({ userEmail, status });

            // Create order items
            for (const item of items) {
                await OrderItem.create({
                    orderId: order.id,
                    deviceId: item.deviceId,
                    quantity: item.quantity,
                });
            }

            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Get all orders
    async getAll(req, res, next) {
        try {
            const { email } = req.body;
            const orders = await Order.findAll({
                include: [{ model: OrderItem, include: [Device] }],
                where: { userEmail: email },
            });
            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Get all orders
    async getAdminAll(req, res, next) {
        try {
            const orders = await Order.findAll({
                include: [{ model: OrderItem, include: [Device] }],
            });
            return res.json(orders);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    
    // Get order by ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const order = await Order.findOne({
                where: { id },
                include: [{ model: OrderItem, include: [Device] }],
            });

            if (!order) {
                return next(ApiError.notFound('Order not found'));
            }

            return res.json(order);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            let { status, userEmail, order_items, notes, employeeEmail } = req.body;
            employeeEmail = employeeEmail == null || employeeEmail == undefined ?  "" : employeeEmail
            notes = notes == null || notes == undefined ?  "" : notes

            // Update the order status
            await Order.update({ status:status, userEmail: userEmail, notes: notes, employeeEmail: employeeEmail }, { where: { id } });

            // Update the order items
            if (order_items && order_items.length > 0) {
                // Remove existing items
                await OrderItem.destroy({ where: { orderId: id } });

                // Add updated items
                for (const item of order_items) {
                    await OrderItem.create({
                        orderId: id,
                        deviceId: item.deviceId,
                        quantity: item.quantity,
                    });
                }
            }

            const updatedOrder = await Order.findOne({
                where: { id },
                include: [{ model: OrderItem, include: [Device] }],
            });

            return res.json(updatedOrder);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    // Delete an order
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            // Delete order items first
            await OrderItem.destroy({ where: { orderId: id } });

            // Delete the order
            await Order.destroy({ where: { id } });

            return res.json({ message: 'Order deleted successfully' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new OrderController();
