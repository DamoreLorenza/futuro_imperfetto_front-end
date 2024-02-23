import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CustomOffCanvas from "../commonComponent/offCanvas/CustomOffCanvas";
import "./css/Event.css"
import "./css/Home.css"
import SpecificEventCard from "../home/specificEventPageCard/SpecificEventCard";

const Event = () => {
    return (
      <>
        <Container className="container">
          <Row className="mt-5">
          <Col xs={1} md={2} lg={1} xl={1} className="inserimentoCanvas">
            <CustomOffCanvas/>
          </Col>
          </Row>
          <Row>
            <Col xs={10} md={10} lg={5} xl={11}>
          <SpecificEventCard/>
            </Col>

            
          </Row>
        </Container>
      </>
    );
  };
  
  export default Event;