import { Col, Container, Row } from "react-bootstrap"
import CustomOffCanvas from "../commonComponent/offCanvas/CustomOffCanvas"
import ReservationList from "../Home/reservationList/ReservationList"
import { useEffect, useState } from "react";


const ReservationListPage = () =>{
    const [userRole, setUserRole] = useState(localStorage.getItem(""));



    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role) {
            setUserRole(role);
        }
    }, []);


    return(
        <>
        {userRole === "ADMIN" &&
        <Container className="container">
          <Row>
          <Col xs={1} md={2} lg={1} xl={2} className="inserimentoCanvas">
            <CustomOffCanvas/>
          </Col>
            <Col xs={10} md={9} lg={10} xl={10}>
<ReservationList/>
            </Col>
            <Col xs={1} md={1} lg={1} xl={1}></Col>
          </Row>
        </Container>
        }
      </>
    )
}

export default ReservationListPage