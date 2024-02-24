import { Col, Container, Row } from "react-bootstrap"
import "./Footer.css"



const Footer = () =>{

    return(
        <>

    <Row className="rowFooter mt-5 mb-5 ">
    <Row className="mt-4">
        <Col xxs={2} xs={3} sm={2} md={2} lg={1} xl={1} xxl={1}>
       <a href="https://www.facebook.com/futuroimperfetto2.0"> <i className="bi bi-facebook text-primary  fs-2 mt-5 mx-5 "></i></a>
        </Col>
        <Col xxs={2} xs={2}  sm={2} md={1} lg={1} xl={1} xxl={1}>
       <a href="https://www.instagram.com/futuroimperfetto/"><i className="bi bi-instagram text-danger fs-2 mt-5 "></i></a> 
        </Col>
        <Col xxs={3} xs={4} sm={3} md={3}>
        <h5 className="pt-3">Informazioni e Contatti:</h5>    
        </Col>
        <Col xxs={7} xs={10} sm={5} md={5} lg={4} xl={3} xxl={3} className="mt-3"><i className="bi bi-envelope-at">   circolofuturoimperfetto@gmail.com</i></Col>
        <Col xxs={4} xs={6} sm={4} md={3} lg={3} xl={2} xxl={2} className="mt-3"><i className="bi bi-telephone">   348 773 6697</i></Col>
        <Col xxs={5} xs={7} sm={3} md={3} lg={2} xl={2} xxl={2} className="mt-3"><i className="bi bi-sign-turn-slight-right">   Via Bologna 26/28, Pescara, Italy</i></Col>
    </Row>
    <Row>

    </Row>
<Row className="mt-5 mb-5">
<Col xs={4}></Col>
<Col xs={4}></Col>
<Col xs={4}></Col>
<Col xs={6}><h6 className="ms-5">Ingresso riservato ai soci Arci</h6></Col>
    
    </Row>
    </Row>


        </>
    )
}

export default Footer