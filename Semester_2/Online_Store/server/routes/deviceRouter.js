const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', deviceController.create)
router.put('/', deviceController.rateDevice)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.put('/update', deviceController.update)
router.put('/delete/:id', deviceController.delete)
module.exports = router