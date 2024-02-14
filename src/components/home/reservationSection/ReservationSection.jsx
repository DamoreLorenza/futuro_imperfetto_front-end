import { useState } from "react"
import "./ReservationSection.css"
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import TimeRangePicker from "react-time-range-picker";


const ReservationSection = () =>{


    return(
        <>
        <Container className="container d-flex justify-content-center">
        <Row className="d-flex justify-content-center align-items-center">
        <Col xs={1} md={2} lg={2} xl={1}></Col>
        <Col xs={8} md={8} lg={8} xl={10}>
    <Card className="text-center prenotazioneCard">
      <Card.Header>Prenota Online</Card.Header>
      <Card.Body>
        <Card.Title>
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Numero persone</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="number" placeholder="Numero persone" />
      </Form.Group>
        </Col>
        </Row> 
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Data prenotazione</Form.Label>
       <Form.Control className="inputPrenotazione" size="sm" type="date" placeholder="Data prenotazione" /> 
      </Form.Group>
      
 
      </Col>
    </Row>
</Card.Title>
        <Card.Text className="cardTextTime">
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Dalle ore</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="time" placeholder="Dalle ore" />
      </Form.Group>
        
        </Col>
        </Row> 
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Alle ore</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="time" placeholder="Alle ore" />
      </Form.Group>
      
      </Col>
    </Row>

    <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Vuoi prenotare un gioco da tavola?</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="text" placeholder="" />
      </Form.Group>
      
      </Col>
    </Row>
        </Card.Text>
        <Card.Footer className="">Hai prenotato il giorno {} alle ore {} per {} persone.
        
        </Card.Footer>
        <Button className="buttonReservation">Conferma prenotazione</Button>
      </Card.Body>

    </Card>
    </Col>
        <Col xs={2} md={2} lg={2} xl={1}></Col>
</Row>
</Container>



        </>
    )
}

export default ReservationSection