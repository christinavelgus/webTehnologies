const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const { Sequelize } = require('sequelize');
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try{
        let {name, price, brandId, typeId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const device = await Device.create({name, price, brandId, typeId, img: fileName})


        if(info) {
            info = JSON.parse(info)
            info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
        }

        return res.json(device)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if(!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if(brandId && typeId) {
            devices = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device)
        }

        async rateDevice(req, res) {
            try {
                const {index, deviceId} = req.body;
                const numericDeviceId = parseInt(deviceId, 10);
                const setRating = await Device.update(
                    {
                        rating: Sequelize.literal(`rating + ${index}`),
                    },
                    {
                        where: {
                            id: numericDeviceId
                        }
                    }
                );
                return res.json(setRating);
            } catch (error) {
                console.error('Произошла ошибка при обновлении рейтинга пристрою:', error);
                return res.status(500).json({ error: 'Произошла ошибка при обновлении рейтинга' });
            }
        }
        
        async update(req, res, next) {
            try {
                
                const parsedDevice = JSON.parse(req.body.device)
                let {name, price, brandId, rating, typeId, info, id} = parsedDevice
                let fileName
                let device
    
                if (req.files) {
                    const {img} = req.files
                    fileName = uuid.v4() + ".jpg"
                    img.mv(path.resolve(__dirname, '..', 'static', fileName))
                }
    
                if (req.files)
                    device = await Device.update({name, price, rating, brandId, typeId, img: fileName}, { where: { id } });
                else
                    device = await Device.update({name, price, rating, brandId, typeId}, { where: { id } });
    
                if (info) {
                    info = JSON.parse(info)
                    info.forEach(i =>
                        DeviceInfo.update({
                            title: i.title,
                            description: i.description,
                            deviceId: device.id
                        },{ where: { deviceId: id } })
                    )
                }
    
                return res.json(device)
            } catch (e) {
                next(ApiError.badRequest(e.message))
            }
    
        }
    
        async delete(req, res) {
            const {id} = req.params
            const result = await Device.destroy(
                {
                    where: {id}
                },
            )
            return res.json(result)
        }
}

module.exports = new DeviceController()