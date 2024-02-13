import { Col, Container, Row } from "react-bootstrap";
import "./css/Home.css"
import CentralSection from "../home/centralSection/CentralSection";

const Home = () => {
    return (
      <>
        <Container className="container">
          <Row className="">
          <h1>ciao</h1>
            <Col>
              <CentralSection />
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Home;