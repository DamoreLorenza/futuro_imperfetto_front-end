import { Card, Col, Container, Row } from "react-bootstrap";
import "./css/Home.css"
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';


const Home = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken") !== null);
  const [user, setUser] = useState([]);
 
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || '');

  const navigate = useNavigate();


  //funzione per logout
  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    navigate("/");
  }


//ascoltiamo gli eventi nello storage per l'accesso e l'uscita dell'utente dal suo profilo
useEffect(() => {
  const handleStorageChange = () => {
    setIsLoggedIn(localStorage.getItem("authToken") !== null);
    const storedUserRole = localStorage.getItem("userRole") || '';
    setUserRole(storedUserRole);
    console.log("userRole:", storedUserRole); // Verifica il valore di userRole
  };

  // Verifica se c'è un token di autenticazione presente nel localStorage
  if (localStorage.getItem("authToken") !== null) {
    setIsLoggedIn(true); //utente è autenticato
    const storedUserRole = localStorage.getItem("userRole") || '';
    setUserRole(storedUserRole);
  } else {
    setIsLoggedIn(false); //utente non è autenticato
    setUserRole('');
  }

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);


const functionGetUser = (event) => {
  if (event) {
    event.preventDefault();
  }

  fetch(`${process.env.REACT_APP_BACKEND}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore");
      }
    })
    .then((data) => {
      console.log("data", data);
      if (data && Array.isArray(data.content)) {
        setUser(data.content);
    }})
    .catch((err) => {
      console.log("errore", err);
    });
};

    return (
      <>
        <Container className="container">
          <Row>
          <Col xs={1} md={2} lg={1} xl={2} className="inserimentoCanvas">
      <Row className="logoutLogin">
            {isLoggedIn && (
            <Button className='iconCanvasWrite' onClick={() => logout()}>
              <i className="bi bi-box-arrow-left iconCanvas"></i>
              Logout
            </Button>
          )}

          {/* Pulsante Login */}
          {!isLoggedIn && (
            <Button className='iconCanvasWrite' onClick={() => navigate("/login")}>
              <i className="bi bi-box-arrow-in-right iconCanvas"></i>
              Login
            </Button>
          )}  
</Row>     
          </Col>
            <Col xs={10} md={9} lg={10} xl={10}>
            <div className="divisoreSezioneCentrale">
              {/* <CentralSection /> */}


      <Card  className="offCanvasSection">
        <Card.Header>
          <Card.Title className='OffcanvasTitle'>BENVENUTI A FUTURO IMPERFETTO 2.0 </Card.Title>
               {/* Pulsante Logout */}
 
          </Card.Header>
        <Card.Body>
        <i className=" iconCanvas">
        <Button className='iconCanvasWrite'
          onClick={() => {
            navigate("/");
          }}>Home</Button>
          </i>
        </Card.Body>
        <Card.Body>
        <i className=" iconCanvas">
        <Button className='iconCanvasWrite'
          onClick={() => {
            navigate("/event");
          }}>Eventi</Button>
          </i>
        </Card.Body>
        <Card.Body>
        <i className=" iconCanvas"><Button className='iconCanvasWrite'
            onClick={() => {
            navigate("/games");
          }}>Giochi da tavola</Button></i>
        </Card.Body>


        <Card.Body>
        <Row>
        <i className="iconCanvas prenotazioniWrite"><Button className='iconCanvasWrite '
           onClick={() => {
            navigate("/reservation");
          }}>Prenotazioni </Button></i>
          </Row>
          <Row>
          {userRole === 'ADMIN' && (
            <Button
              onClick={() => {
            navigate("/reservationListPage");}}
             className='buttonListaPrenotazioni'>| Lista prenotazioni</Button>
          )}
</Row>
        </Card.Body>

        <Card.Body>
        

          {/* Pulsante Profilo */}
          {isLoggedIn && (
            <Button className='iconCanvasWrite' onClick={() => navigate("/profile")}>
              <i className="bi bi-person-circle iconCanvas"></i>
              Profilo
            </Button>
          )}



        </Card.Body>
      </Card>


              </div>
            </Col>
            <Col xs={1} md={1} lg={1} xl={0}></Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Home;