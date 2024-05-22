import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import {Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import { Context } from '../index';

const BrandBar = observer(() => {
    const {device} = useContext(Context)

  return (
    <Row className='mt-3'>
      <h2>Бренд пристрою</h2>
        <ListGroup>
        {device.brands.map(brand =>
            <ListGroupItem
                style={{cursor: 'pointer', overflow: "hidden"}}
                active={brand.id === device.selectedBrand.id}
                key={brand.id}
                className="p-3"
                onClick={() => device.setSelectedBrand(brand)}
            >
                {brand.name}
            </ListGroupItem>
        )}
        </ListGroup>
        <Button
                className="p-2 mt-3"
                onClick={() => device.setSelectedBrand("")}
        >
               Скинути фільтр
        </Button>
    </Row>
  )
})

export default BrandBar