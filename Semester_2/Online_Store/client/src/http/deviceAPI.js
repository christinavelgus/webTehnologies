import {$authHost, $host } from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const deleteType = async(typeId) => {
    console.log(typeId)
    const {data} = await $authHost.delete('api/type', {data: {typeId}})
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const deleteBrand = async(brandId) => {
    const {data} = await $authHost.delete('api/brand', {data: {brandId}})
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit
    }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const updateDevice = async (device) => {
    try{
        console.log(JSON.stringify(device))

        const {data} = await $host.put('api/device/update', device)
        console.log()
        return data
    }
    catch(ex){
        console.log(ex)
    }
}

export const deleteDevice = async (id) => {
    try{
        console.log("Delete device with id: " + id)

        const {data} = await $host.put('api/device/delete/'+ id)
        console.log()
        return data
    }
    catch(ex){
        console.log(ex)
    }
}

// ------ Добавляю подключение для добавление crud с корзиной ------- //

export const addToBasket = async (deviceId) => {
    const {data} = await $authHost.post('api/baskets', deviceId)
    return data
}

export const removeFromBasket = async (id) => {
    console.log({data: {id}})
    const { data } = await $authHost.delete('api/baskets', {data: {id}});
        return data;
};

export const getBasket = async () => {
    const {data} = await $authHost.get('api/baskets')
    return data
}

export const sendBasket = async (deviceId) => {
    const {data} = await $authHost.post('api/baskets', deviceId)
    return data
}

export const addRating = async (index, deviceId) => {
        const { data } = await $authHost.post('api/rating', {index, deviceId});
        console.log(data)
        return data;
}

export const fetchRating = async (id) => {
    console.log({id})
    const {data} = await $host.get('api/rating/' + id)
    return data
}

export const fetchIsSetRating = async (id, userToken) => {
    console.log({id})
    const {data} = await $authHost.get('api/rating', {params: {
        id, userToken
    }})
    return data
}


// ------ Добавляю подключение для добавление crud с oreder ------- //

// Create a new order
export const createOrder = async (order) => {
    const { data } = await $authHost.post('api/order', order);
    return data;
};

// Get all orders
export const fetchOrders = async (email) => {
    const { data } = await $authHost.post('api/order/getByEmail', {email: email});
    return data;
};

// Get all orders
export const fetchAdminOrders = async () => {
    const { data } = await $authHost.get('api/order');
    return data;
};

// Get order by ID
export const fetchOrderById = async (id) => {
    const { data } = await $authHost.get(`api/order/${id}`);
    return data;
};

// Update an order
export const updateOrder = async (id, updatedOrder) => {
    const { data } = await $authHost.put(`api/order/${id}`, updatedOrder);
    return data;
};

// Delete an order
export const deleteOrder = async (id) => {
    const { data } = await $authHost.delete(`api/order/${id}`);
    return data;
};

