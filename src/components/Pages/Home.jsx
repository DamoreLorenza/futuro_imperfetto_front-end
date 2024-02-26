import { Accordion, Card, Carousel, Col, Container, Image, Row } from "react-bootstrap";
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
          <Col xs={1} md={2} lg={1} xl={2} className="inserimentoHome">        
        
<Row className="logoutLogin ms-4 mb-2">
          {/* Pulsante Profilo */}
          {isLoggedIn && (
            <Button className='iconHomeWrite' onClick={() => navigate("/profile")}>
              <i className="bi bi-person-circle iconHome"></i>
              Profilo
            </Button>
          )}
</Row>

      <Row >
            {isLoggedIn && (
            <Button className='iconHomeWrite' onClick={() => logout()}>
              <i className="bi bi-box-arrow-left iconHome"></i>
              Logout
            </Button>
          )}

          {/* Pulsante Login */}
          {!isLoggedIn && (
            <Button className='iconHomeWrite' onClick={() => navigate("/login")}>
              <i className="bi bi-box-arrow-in-right iconHome"></i>
              Login
            </Button>
          )}  
</Row>     
          </Col>
            <Col xs={10} md={9} lg={10} xl={10}>
            <div className="divisoreSezioneCentrale">
              {/* <CentralSection /> */}


      <Card  className="offHomeSection ms-5">
        <Card.Header>
          <Card.Title className='OffHomeTitle ms-5'>BENVENUTI A FUTURO IMPERFETTO 2.0 </Card.Title>
               {/* Pulsante Logout */}
 
          </Card.Header>
        <Card.Body>
        <i className="iconHome">
        <Button className='iconHomeWrite'
          onClick={() => {
            navigate("/");
          }}>Home</Button>
          </i>
        </Card.Body>
        <Card.Body>
        <i className=" iconHome">
        <Button className='iconHomeWrite'
          onClick={() => {
            navigate("/event");
          }}>Eventi</Button>
          </i>
        </Card.Body>
        <Card.Body>
        <i className=" iconHome"><Button className='iconHomeWrite'
            onClick={() => {
            navigate("/games");
          }}>Giochi da tavola</Button></i>
        </Card.Body>


        <Card.Body>
        <Row>
        <i className="iconHome prenotazioniWriteHome"><Button className='iconHomeWrite '
           onClick={() => {
            navigate("/reservation");
          }}>Prenotazioni </Button></i>
          </Row>
          <Row>
          {userRole === 'ADMIN' && (
            <Button
              onClick={() => {
            navigate("/reservationListPage");}}
             className='buttonListaPrenotazioni2'>| Lista prenotazioni</Button>
          )}
</Row>
        </Card.Body>


<Card.Body>
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="iconHomeWrite iconHome">Contatti</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

</Card.Body>



      </Card>


              </div>
            </Col>
            <Col xs={1} md={1} lg={1} xl={1}></Col>
          </Row>
<Row>
<Col xs={1} md={1} lg={1} xl={2}></Col>
<Col xs={1} md={1} lg={1} xl={8}>
<Carousel>
      <Carousel.Item interval={1000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c1.jpg"} />
       
      </Carousel.Item>
      <Carousel.Item interval={1000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c2.jpg"} />
       
      </Carousel.Item>
      <Carousel.Item interval={1000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c3.jpg"} />
       
        </Carousel.Item>
        <Carousel.Item interval={1000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c4.jpg"} />
       
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      
        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c5.jpg"} />
       
      </Carousel.Item>

    </Carousel>

</Col>
<Col xs={1} md={1} lg={1} xl={2}></Col>

</Row>
          <Row>

<p>
Futuro Imperfetto 2.0 nasce il 14 settembre 2014 grazie gruppo di ragazzi che ogni mercoledì sera si riuniva in un garage, spartendosi in parti uguali l’affitto, per giocare da tavolo. 
Tanto erano presi da questa passione che il garage non bastava più.
Volevano un luogo accogliente dove riunirsi e che potesse accogliere nuov* giocator*.
E dove prima c’era una lavanderia hanno immaginato e poi creato il locale che conosciamo oggi.
Sono passati quasi 10 anni da allora, e a Futuro Imperfetto, la nostra amata nave volante, la passione per il gioco da tavolo è ancora il cuore pulsante del progetto. Cuore pulsante ma non unico motore. 
Da diversi anni infatti ospitiamo concerti, spettacoli teatrali, presentazioni di libri, esposizioni artistiche, incontri e tavoli di confronto su temi vari.
I principi che portiamo avanti sono quelli dell'inclusività e della condivisione.
tutt* sono bene accolti sulla nave volante.
</p>

          </Row>
        </Container>
      </>
    );
  };
  
  export default Home;