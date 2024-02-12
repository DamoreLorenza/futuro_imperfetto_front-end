import { Col, Container, Row } from "react-bootstrap";
import CentralSection from "../Home/CentralSection";

const Home = () => {
    return (
      <>
        <Container>
          <Row className="">
            <Col sm={10} md={4} xl={2}>
              <CentralSection />
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Home;