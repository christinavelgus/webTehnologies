
import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Col, Row, Card, Dropdown } from 'react-bootstrap'
import { Context } from "../index";
import { fetchDevices, fetchAdminOrders, deleteOrder, removeFromBasket, fetchOrderById, updateOrder } from "../http/deviceAPI";
import { useNavigate } from 'react-router-dom';
import CreateBrand from '../components/modals/CreateBrand'
import CreateType from '../components/modals/CreateType'
import CreateDevice from '../components/modals/CreateDevice'
import DeleteType from '../components/modals/DeleteType'
import DeleteBrand from '../components/modals/DeleteBrand'
import CreateUser from '../components/modals/CreateUser'
import AdminDeviceList from "../components/AdminDeviceList";
import { SHOP_ROUTE, ORDER_UPDATE_ROUTE } from '../utils/consts';
import { getAdmins } from '../http/userAPI';
import "../assets/css/AdminStyles.css"
import Pages from '../components/Pages'

function Admin() {
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)
  const [userVisible, setUserVisible] = useState(false)
  const [orders, fetchOrders] = useState([])
  const [typeDeleteVisible, setTypeDeleteVisible] = useState(false)
  const [brandDeleteVisible, setBrandDeleteVisible] = useState(false)
  const [admins, setAdmins] = useState([])
  const { device } = useContext(Context)
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const statuses = [
    { name: "pending", id: 0 },
    { name: "in proccess", id: 1 },
    { name: "sent", id: 2 },
    { name: "failed", id: 3 }
  ]

  const sortOrders = (orders) => {
    return orders.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  }

  const handleRemoveOrderClick = (orderId) => {
    if (window.confirm("Do you want to delete order with Number: " + orderId + " ?"))
      deleteOrder(orderId)
        .then(response => {
          // Optionally, remove associated items from the basket
          device.basket.forEach(item => removeFromBasket(item.id));
          fetchAdminOrders().then(data => { fetchOrders(sortOrders(data))});
        })
        .catch(error => {
          console.error('Error removing order:', error);
        });
  };

  const updateStatus = (status, orderId) => {
    let order;
    fetchOrderById(orderId).then((data) => {
      order = data
      order.status = status
      updateOrder(orderId, order).then((updatedData) => {
        fetchAdminOrders().then(data => { fetchOrders(sortOrders(data))});
      })
    })
  }

  const handleEditOrderClick = (id) => {
    navigate(`${ORDER_UPDATE_ROUTE}/${id}`);
  };

  const updateOrderEmployee = (employeeEmail, orderId) => {
    let order;
    fetchOrderById(orderId).then((data) => {
      order = data
      order.employeeEmail = employeeEmail
      updateOrder(orderId, order).then((updatedData) => {
        fetchAdminOrders().then(data => { fetchOrders(sortOrders(data))});
      })
    })
  }

  useEffect(() => {
    getAdmins().then(data => { setAdmins(data) })
    fetchAdminOrders().then(data => { fetchOrders(sortOrders(data))});
    fetchDevices(null, null, 1, 20).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 20).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType, device.selectedBrand,])

  return (
    <Container className='d-flex flex-column'>
      <h2 className='text-center mt-5'>Замовлення</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Номер</th>
            <th>Email</th>
            <th>Примітка</th>
            <th>Відповідальний за замовлення</th>
            <th>Статус</th>
            <th>Змінити</th>
            <th>Видалити</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>
            <tr key={order.id}>
              <th scope="row">ORD-{order.id}</th>
              <td>{order.userEmail}</td>
              <td>{order.notes}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle className='btn-dark w220'>{order.employeeEmail || "Змінити відповідального"}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {admins.map(admin =>
                      <Dropdown.Item
                        onClick={() => updateOrderEmployee(admin.email, order.id)}
                        key={admin.id}
                      >
                        {admin.email}
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle className="btn-dark w120">{order.status || "Змінити статус"}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {statuses.map(status =>
                      <Dropdown.Item
                        onClick={() => updateStatus(status.name, order.id)}
                        key={status.id}
                      >
                        {status.name}
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td><button className="btn btn-outline-dark" onClick={() => handleEditOrderClick(order.id)}>Змінити</button></td>
              <td><button className="btn btn-danger" onClick={() => handleRemoveOrderClick(order.id)}>Видалити</button></td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className='text-center mt-5'>Пристрої</h2>
      <AdminDeviceList />
      <Pages />

      <h2 className='text-center mt-5'>Створити</h2>
      <table className="table w50">
        <thead>
          <tr className='d-flex justify-content-center'>
            <td><button className='btn btn-outline-success w120' onClick={() => setTypeVisible(true)}>Тип</button></td>
            <td><button className='btn btn-outline-success w120' onClick={() => setBrandVisible(true)}>Бренд</button></td>
            <td><button className='btn btn-outline-success w120' onClick={() => setDeviceVisible(true)}>Пристрій</button></td>
            <td><button className='btn btn-outline-success w120' onClick={() => setUserVisible(true)}>Користувача</button></td>
          </tr>
        </thead>
      </table>

      <h2 className='text-center'>Видалити</h2>
      <table className="table w50 d-flex justify-content-center">
        <thead>
          <tr className='d-flex justify-content-center'>
            <td><button className='btn btn-outline-danger w120' onClick={() => setTypeDeleteVisible(true)}>Тип</button></td>
            <td><button className='btn btn-outline-danger w120' onClick={() => setBrandDeleteVisible(true)}>Бренд</button></td>
          </tr>
        </thead>
      </table>

      <CreateUser show={userVisible} onHide={() => setUserVisible(false)} />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
      <DeleteType show={typeDeleteVisible} onHide={() => setTypeDeleteVisible(false)} />
      <DeleteBrand show={brandDeleteVisible} onHide={() => setBrandDeleteVisible(false)} />
    </Container>
  )
}

export default Admin