import { Col, Container, Row } from "react-bootstrap";
import "./css/Home.css"
import "./css/Reservation.css"
import CustomOffCanvas from "../commonComponent/offCanvas/CustomOffCanvas";
import ReservationSection from "../home/reservationSection/ReservationSection";
import ReservationForm from "../home/reservationSection/ReservationForm";

const Reservation = () => {
    return (
      <>
        <Container className="container">
          <Row>
          <Col xs={1} md={2} lg={1} xl={2} className="inserimentoCanvas"> 
            <CustomOffCanvas/>
          </Col>
            <Col xs={10} md={9} lg={10} xl={10}>
{/* <ReservationSection/> */}
<ReservationForm/>
            </Col>
            <Col xs={1} md={1} lg={1} xl={1}></Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Reservation;