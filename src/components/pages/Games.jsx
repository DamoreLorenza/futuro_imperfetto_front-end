import { Col, Container, Row } from "react-bootstrap";
import "./css/Home.css"
import "./css/Games.css"
import CustomOffCanvas from "../commonComponent/offCanvas/CustomOffCanvas";
import GamesCard from "../home/gamesCard/GamesCard";

const Games = () => {
    return (
      <>
        <Container className="container">
          <Row className="mt-5">
          <Col xs={1} md={2} lg={1} xl={1} className="inserimentoCanvas">
            <CustomOffCanvas/>
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