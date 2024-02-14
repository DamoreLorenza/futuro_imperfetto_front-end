import { Col, Container, Row } from "react-bootstrap";
import EventCard from "../eventCard/EventCard";

const CentralSection = () => {
    return (
      <>
        <Container>
          <Row>
          <Col xs={1}  md={1} lg={1} xl={1}></Col>
            <Col  xs={10}  md={10} lg={10} xl={10}>
<EventCard/>
            </Col>
            <Col xs={1}  md={1} lg={1} xl={1}></Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default CentralSection;
