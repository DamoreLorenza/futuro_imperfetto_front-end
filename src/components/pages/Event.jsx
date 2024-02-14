import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CustomOffCanvas from "../commonComponent/offCanvas/CustomOffCanvas";
import "./css/Event.css"

const Event = () => {
    return (
      <>
        <Container className="container">
          <Row className="mt-5">
          <Col xs={1} md={2} lg={1} xl={2} className="inserimentoCanvas">
            <CustomOffCanvas/>
          </Col>
            <Col xs={5} md={4} lg={5} xl={4}>

            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>


            </Col>
            <Col xs={1} md={2} lg={1} xl={2}>
            </Col>
            <Col xs={5} md={4} lg={5} xl={4}>

            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>


            </Col>
          </Row>

{/* seconda row */}

<Row className="mb-5">
          <Col xs={1} md={2} lg={1} xl={2} >
        
          </Col>
            <Col xs={5} md={4} lg={5} xl={4}>

            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>



            </Col>
            <Col xs={1} md={2} lg={1} xl={2}>
            </Col>
            <Col xs={5} md={4} lg={5} xl={4}>
            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>


            </Col>
          </Row>


        </Container>
      </>
    );
  };
  
  export default Event;