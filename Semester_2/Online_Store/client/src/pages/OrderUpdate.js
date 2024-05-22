import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Dropdown } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';
import { fetchOrderById, updateOrder } from '../http/deviceAPI';

const EditOrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({ order_items: [] });
    const [formData, setFormData] = useState({
        userEmail: '',
        status: '',
        notes: '',
        employeeEmail: '',
        order_items: []
    });
    const statuses = [
        { name: "pending", id: 0 },
        { name: "in process", id: 1 },
        { name: "sent", id: 2 },
        { name: "failed", id: 3 }
    ];

    useEffect(() => {
        fetchOrderById(id).then((data) => {
            setOrder(data);
            setFormData({
                userEmail: data.userEmail,
                status: data.status,
                order_items: data.order_items,
                employeeEmail: data.employeeEmail,
                notes: data.notes
            });
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStatusChange = (status) => {
        setFormData({ ...formData, status: status });
    };

    const handleSave = async () => {
        const updatedOrder = {
            userEmail: formData.userEmail,
            employeeEmail: formData.employeeEmail,
            status: formData.status,
            order_items: formData.order_items,
            notes: formData.notes
        };
        console.log(updatedOrder)
        await updateOrder(id, updatedOrder).then(data => console.log(data));
        navigate(ADMIN_ROUTE); // Replace with your desired route after save
    };

    const handleRemoveItem = (itemId) => {
        const updatedOrderItems = formData.order_items.filter(item => item.id !== itemId);
        setFormData({ ...formData, order_items: updatedOrderItems });

        // Immediately update the order after removing the item
        const updatedOrder = {
            ...formData,
            order_items: updatedOrderItems
        };
        updateOrder(id, updatedOrder);
    };

    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4">
                        <Form>
                            <Form.Group controlId="formUserEmail">
                                <Form.Label>User Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter user email"
                                    name="userEmail"
                                    value={formData.userEmail}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formStatus">
                                <Form.Label>Status</Form.Label>
                                <Dropdown className="mt-2 mb-2">
                                    <Dropdown.Toggle>{formData.status || "Change Status"}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {statuses.map(status => (
                                            <Dropdown.Item
                                                key={status.id}
                                                onClick={() => handleStatusChange(status.name)}
                                            >
                                                {status.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                            <Form.Group controlId="formNotes">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your notes"
                                    name="notes"
                                    value={formData.notes ? formData.notes : " "}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col md={6}>
                    <Card className="p-4">
                        <h3>Order Items</h3>
                        {formData.order_items.map(item => (
                            <Card className="mb-2" key={item.id}>
                                <Row className="align-items-center">
                                    <Col>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Device Name:</strong> {item.device?.name}</p>
                                        <p><strong>Device Price:</strong> {item.device?.price} грн</p>
                                    </Col>
                                    <Col md={3}>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EditOrderPage;
