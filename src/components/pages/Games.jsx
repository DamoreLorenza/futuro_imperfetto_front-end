import { Col, Container, Form, Row } from "react-bootstrap";
import "./css/Home.css"
import "./css/Games.css"
import CustomOffCanvas from "../commonComponent/offCanvas/CustomOffCanvas";
import GamesCard from "../home/gamesCard/GamesCard";

const Games = () => {
    return (
      <>
        <Container className="container">
        
          <Row className="d-flex justify-content-between">
          <Col xs={1} md={2} lg={1} xl={1} className="inserimentoCanvas d-flex">
            <CustomOffCanvas/>
            
          </Col>
          <Col xs={10} md={2} lg={1} xl={1} >
                      <Form>
          <Form.Control
              type="text"
              placeholder="Search"
              className="formSearchBar mr-sm-2"
            />
          </Form>
          </Col>

          </Row>
        
          <Row >
          <Col xs={1} md={2} lg={1} xl={1} >
            
          </Col>
            <Col xs={10} md={10} lg={5} xl={5}>
          <GamesCard/>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Games;