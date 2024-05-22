import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import bigStar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom'
import { fetchOneDevice, addToBasket, addRating, fetchIsSetRating, fetchRating } from '../http/deviceAPI'
import { Context } from '../index'


function DevicePage() {
  const [device, setDevice] = useState({ info: [] })
  const userToken = localStorage.getItem("token")
  const { user } = useContext(Context)

  const { id } = useParams()

  let rates = [1, 2, 3, 4, 5]


  useEffect(() => {
    Promise.all([fetchRating(id), fetchOneDevice(id)]).then(([ratingData, deviceData]) => {
      setDevice({ ...deviceData, rating: ratingData.averageRating });
    });
  }, []);

  // ------- Создаём функцию для записи ------- //
  const add = () => {
    if (user.isAuth) {
      const formData = new FormData()
      formData.append('deviceId', id)
      addToBasket(formData).then(data => alert(`Товар ` + device.name + ` був добавлений в вашу корзину!`))
    }
    else {
      alert("Ви не авторизовані")
    }
  }

  const clickRating = (index) => {
    if (user.isAuth) {
      fetchIsSetRating(id, userToken).then(data => {
        console.log(data)
        if (data.length > 0) {
          alert("Ви вже поставили оцінку");
        } else {
          addRating(index, id).then(data => {
            alert("Дякую за оцінку");
            // Обновляем состояние после успешного удаления
            Promise.all([fetchRating(id), fetchOneDevice(id)]).then(([ratingData, deviceData]) => {
              setDevice({ ...deviceData, rating: ratingData.averageRating });
            });
          });
        }
      });
    }
    else {
      alert("Ви не авторизовані")
    }
  }



  return (
    <Container>
      <Row>
        <Col md={4} className='d-flex flex-column align-items-center justify-content-around mt-2'>
          <h2
            className="d-flex justify-content-center"
            style={{ width: 300 }}
          >
            {device.name}
          </h2>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />

        </Col>
        <Col md={4}>
          <Row className='d-flex flex-column align-items-center text-center justify-content-around'>
            <h1>Оцініть товар</h1>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
            >
              {(Math.round(device.rating * 10) / 10).toString()}
            </div>
            <div
              className="d-flex align-items-center justify-content-center rounded"
              style={{ border: '5px solid lightgray' }}
            >
              {rates.map((index) =>
                <Button
                  variant={"outline-dark"}
                  onClick={() => clickRating(index)}
                  className="m-1"
                  key={index}
                >
                  {index}
                </Button>
              )}
            </div>
          </Row>
        </Col>
        <Col md={4} className='d-flex flex-column align-items-center justify-content-around mt-2'>
          <Card
            className='d-flex flex-column align-items-center justify-content-around '
            style={{ width: 300, height: 335, fontSize: 32, border: '5px solid lightgray' }}
          >
            <h3>От: {device.price} грн.</h3>
            <Button variant={"outline-dark"} onClick={add} >Добавити в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className='d-flex flex-column m-3'>
        <h1>Характеристики</h1>
        {device.info.map((info, index) =>
          <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        )}
      </Row>
    </Container>
  )
}

export default DevicePage