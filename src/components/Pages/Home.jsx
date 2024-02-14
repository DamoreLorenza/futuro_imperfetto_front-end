import { Col, Container, Row } from "react-bootstrap";
import "./css/Home.css"
import CentralSection from "../home/centralSection/CentralSection";
import CustomOffCanvas from "../commonComponent/offCanvas/CustomOffCanvas";

const Home = () => {
    return (
      <>
        <Container className="container">
          <Row>
          <Col xs={1} md={2} lg={1} xl={2} className="inserimentoCanvas">
            <CustomOffCanvas/>
          </Col>
            <Col xs={10} md={9} lg={10} xl={10}>
            <div className="divisoreSezioneCentrale">
              <CentralSection />
              </div>
            </Col>
            <Col xs={1} md={1} lg={1} xl={1}></Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Home;