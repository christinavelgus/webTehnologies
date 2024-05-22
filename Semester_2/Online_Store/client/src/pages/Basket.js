import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { getBasket, removeFromBasket, createOrder, fetchOrders, deleteOrder } from '../http/deviceAPI';
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import "../assets/css/BasketStyles.css"


const Basket = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        getBasket().then(data => device.setBaskets(data));
        fetchOrders(localStorage.email).then(data => device.setOrders(data));
    }, [device]);

    const remove = (id) => {
        console.log(id)
        removeFromBasket(id)
            .then(data => {
                getBasket().then(data => device.setBaskets(data));
            })
            .catch(error =>
                alert('Произошла ошибка при удалении из корзины'));
    };

    const sendOrder = () => {
        if (device.basket.length < 1) {
            alert('Ваша корзина пуста');
            return
        }

        let items = device.basket.map(item => new Object({ deviceId: item.deviceId, quantity: 1 }))
        const newOrder = {
            userEmail: localStorage.email,
            items: items,
            status: 'pending'
        };

        createOrder(newOrder).then(order => {
            console.log('Order created:', order);
        }).catch(error => {
            console.error('Error creating order:', error);
        });
        alert('Ваше замовлення було успішно оформлене');
        device.basket.forEach(item => { removeFromBasket(item.id) })
        fetchOrders(localStorage.email).then(data => device.setOrders(data));
        getBasket().then(data => device.setBaskets(data));
    }

    const removeOrder = (orderId) => {
        if (window.confirm("Do you want to delete order with Number: " + orderId + " ?"))
            deleteOrder(orderId)
                .then(response => {
                    console.log('Order removed:', response);
                    alert('Ваше замовлення було успішно видалене');
                    device.basket.forEach(item => removeFromBasket(item.id));
                    device.setOrders(device.orders.filter(item => item.id !== orderId));
                })
                .catch(error => {
                    console.error('Error removing order:', error);
                    alert('Сталася помилка під час видалення замовлення');
                });
    };

    let prices = 0;
    device.basket.forEach(item =>
        prices += Number(item.device.price)
    );
    
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3 w60"
        >
            <h2>Ваші замовлення</h2>
            {console.log(device.orders)}
            {device.orders.map(order =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={order.id}>
                    <Row className="d-flex w-100">
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-center align-items-center">
                                <h4 className="font-weight-light">Номер замовлення:</h4>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-center align-items-center">
                                {"ORD-" + order.id}
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-center align-items-center">
                                <h4 className="font-weight-light">Статус:</h4>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-center align-items-center">
                                {order.status}
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-center align-items-center">
                                <h4 className="font-weight-light">Сума: </h4>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-center align-items-center">
                                {order.order_items.reduce((sum, item) => sum + Number(item.device.price), 0)} грн
                            </div>
                        </Col>
                        <Col md={1}>
                            <Button
                                onClick={() => removeOrder(order.id)}
                                variant={'outline-danger'}
                            >
                                Видалити
                            </Button>
                        </Col>
                    </Row>
                    {order.order_items.map(item =>
                        <Row className="d-flex w-100" key={item.id}>
                            <hr />
                            <Col>
                                Назва товара: {item.device.name}, Ціна {item.device.price} грн
                            </Col>
                        </Row>
                    )}
                </Card>
            )}

            <h2 className="pb-2 mt-5">Корзина</h2>

            <Card className="d-flex w-100 p-2 justify-content-center mb-5">
                {device.basket.map(product =>
                    <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                        <Row className="d-flex w-100">
                            <Col>
                                <div className="d-flex flex-row align-items-center">
                                    <img src={process.env.REACT_APP_API_URL + product.device.img} width={50} alt={product.device.name} />
                                    <h5 className="pl-3 ml5">Назва товара: {product.device.name}</h5>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                    <h5 className="font-weight-light">Вартість: {product.device.price} грн</h5>
                                </div>
                            </Col>
                            <Col md={1}>
                                <Button
                                    onClick={() => remove(product.id)}
                                    variant={'outline-danger'}
                                >
                                    Видалити
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                )}

                <Card className="d-flex w-100 p-2 justify-content-center mb-5">
                    <Row className="d-flex w-100">
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-start align-items-center">
                                <h1 className="pr-2">ЗАГАЛОМ: </h1>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h5 className="ml-2">{prices} грн</h5>
                            </div>
                        </Col>
                        <Col md={1}>
                            <Button
                                onClick={() => sendOrder()}
                                variant={'outline-success'}
                            >
                                Замовити
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Card>
        </Container>
    );
});

export default Basket;
