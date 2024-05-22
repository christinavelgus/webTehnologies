import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Table, Button } from 'react-bootstrap';
import { ADMIN_DEVICE_ROUTE, ADMIN_ROUTE } from '../utils/consts';
import { deleteDevice, fetchDevices } from '../http/deviceAPI';
import { useNavigate } from 'react-router-dom';

const AdminDeviceTable = observer(() => {
    const { device } = useContext(Context);
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`${ADMIN_DEVICE_ROUTE}/${id}`);
    };

    const handleDeleteClick = async (id, name) => {
        if (window.confirm("Do you want to delete " + name + " ?"))
            await deleteDevice(id)

        fetchDevices(null, null, 1, 20).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
          })
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Номер</th>
                    <th>Зображення</th>
                    <th>Назва</th>
                    <th>Рейтинг</th>
                    <th>Ціна</th>
                    <th>Змінити</th>
                    <th>Видалити</th>
                </tr>
            </thead>
            <tbody>
                {device.devices.map((deviceItem, index) => (
                    <tr key={deviceItem.id} style={{ cursor: 'pointer' }}>
                        <th>{index + 1}</th>
                        <td>
                            <img
                                src={process.env.REACT_APP_API_URL + deviceItem.img}
                                alt={deviceItem.name}
                                width="50"
                                height="50"
                            />
                        </td>
                        <td>{deviceItem.name}</td>
                        <td>{deviceItem.rating}</td>
                        <td>{deviceItem.price} грн</td>
                        <td><button className='btn btn-outline-dark' onClick={() => handleRowClick(deviceItem.id)}>Змінити</button></td>
                        <td><button className='btn btn-danger' onClick={() => handleDeleteClick(deviceItem.id,deviceItem.name)}>Видалити</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
});

export default AdminDeviceTable;
