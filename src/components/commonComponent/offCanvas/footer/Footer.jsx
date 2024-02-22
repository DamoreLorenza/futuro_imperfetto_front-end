import { Col, Container, Row } from "react-bootstrap"
import "./Footer.css"



const Footer = () =>{

    return(
        <>
<Container className="containerFooter">
    <Row>
    <Row>
        <Col xs={1}>
       <a> <i className="bi bi-facebook text-primary fs-2 my-5 mx-5"></i></a>
        </Col>
        <Col xs={1}>
       <a><i className="bi bi-instagram text-danger fs-2 my-5"></i></a> 
        </Col>
        <Col xs={5}></Col>
        <Col xs={5}></Col>
    </Row>
    <Row>
<h5>Informazioni e Contatti</h5>
    </Row>
    <Row>
        <Col>
        <i className="bi bi-envelope-at">circolofuturoimperfetto@gmail.com</i>
        </Col>
        <Col>
        <i className="bi bi-telephone">348 773 6697</i>
        </Col>
        <Col>
        <i className="bi bi-sign-turn-slight-right">Via Bologna 26/28, Pescara, Italy</i>
        </Col>

    </Row>
    <p>Ingresso riservato ai soci Arci</p>
    </Row>
</Container>

        </>
    )
}

export default Footer