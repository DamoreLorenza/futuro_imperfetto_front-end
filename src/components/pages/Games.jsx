import { Col, Container, Form, Row } from "react-bootstrap";
import "./css/Home.css"
import "./css/Games.css"
import CustomOffCanvas from "../commonComponent/offCanvas/CustomOffCanvas";
import GamesCard from "../home/gamesCard/GamesCard";
import { useState } from "react";

const Games = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Stato per il termine di ricerca

  // Funzione per gestire il cambio del termine di ricerca
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
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
              className="formSearchBar  mr-sm-2 "
              value={searchTerm} // Assegna il valore di ricerca al campo di input
                onChange={handleSearchChange}
                
            />
          </Form>
          </Col>

          </Row>
        
          <Row >
          <Col xs={2} md={3} lg={1} xl={1} >
            
          </Col>
            <Col xs={10} md={9} lg={11} xl={11}>
          <GamesCard searchTerm={searchTerm}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Games;