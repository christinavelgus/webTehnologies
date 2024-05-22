const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const basketRouter = require('./basketRouter')
const ratingRouter = require('./ratingRouter')
const orderRouter = require('./orderRouter'); // Import the order routes


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/baskets', basketRouter)
router.use('/rating', ratingRouter)
router.use('/order', orderRouter); // Use the order routes

module.exports = router