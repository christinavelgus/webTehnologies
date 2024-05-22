const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController')

// Routes
router.post('/', orderController.create); // Create a new order
router.post('/getByEmail', orderController.getAll); // Get all orders
router.get('/', orderController.getAdminAll); // Get all orders
router.get('/:id', orderController.getOne); // Get an order by ID
router.put('/:id', orderController.update); // Update an order by ID
router.delete('/:id', orderController.delete); // Delete an order by ID

module.exports = router;
