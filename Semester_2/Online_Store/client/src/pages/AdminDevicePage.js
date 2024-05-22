import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneDevice, updateDevice } from '../http/deviceAPI';
import { useNavigate } from 'react-router-dom';

const AdminDevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        rating: '',
        info: [],
    });

    useEffect(() => {
        fetchOneDevice(id).then((data) => {
            setDevice(data);
            setFormData({
                id: data.id,
                name: data.name,
                price: data.price,
                rating: data.rating,
                info: data.info,
                brandId: data.brandId,
                typeId: data.typeId
            });
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        const data = new FormData();
        let device ={
            id: formData.id,
            name: formData.name,
            price: formData.price,
            rating: formData.rating,
            brandId: formData.brandId,
            typeId: formData.typeId,
            info: JSON.stringify(formData.info),
            img: file
        } 
        data.append('device', JSON.stringify(device));
        if (file) {
            data.append('img', file);
        }

        await updateDevice(data);
        navigate('/desired-route'); // Replace with your desired route after save
    };

    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4">
                        <Form>
                            <Form.Group controlId="formImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    className="mt-3"
                                    type="file"
                                    onChange={selectFile}
                                />
                            </Form.Group>
                            <Form.Group controlId="formName">
                                <Form.Label>Device Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter device name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formRating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter rating"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Price (in grn)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    name="price"
                                    value={formData.price}
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
                        <Row className="mb-3">
                            <Col>
                                <h3>Device Details</h3>
                            </Col>
                        </Row>
                        <Col md={4}>
                            <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                        </Col>
                        <Row className="mt-3">
                            <Col>
                                <h5>{formData.name}</h5>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <p><strong>Rating:</strong> {formData.rating}</p>
                                <p><strong>Price:</strong> {formData.price} grn</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDevicePage;
