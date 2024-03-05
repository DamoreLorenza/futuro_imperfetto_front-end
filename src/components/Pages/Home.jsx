import { Accordion, Card, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import "./css/Home.css"
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import "../../App.css"

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


//eventi nello storage per l'accesso e l'uscita dell'utente dal suo profilo
useEffect(() => {
  const handleStorageChange = () => {
    setIsLoggedIn(localStorage.getItem("authToken") !== null);
    const storedUserRole = localStorage.getItem("userRole") || '';
    setUserRole(storedUserRole);
    console.log("userRole:", storedUserRole); // Verifica il valore di userRole
  };

  // Verifico se c'è un token di autenticazione presente nel localStorage
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
        {/* <Container className="container"> */}
          <Row >
          <Image src="https://res.cloudinary.com/drf1t0gkq/image/upload/v1708045968/paux2tmz8k7itvbvtzw3.png" className="dadi"/>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} className="inserimentoHome">        
        
<Row className="logoutLogin  mb-2">
          {/* Pulsante Profilo */}
          {isLoggedIn && (
            <Button className='iconHomeWrite' onClick={() => navigate("/profile")}>
              <i className="bi bi-person-circle iconHome me-2"></i>
              Profilo
            </Button>
          )}
</Row>

      <Row >
            {isLoggedIn && (
            <Button className='iconHomeWrite' onClick={() => logout()}>
              <i className="bi bi-box-arrow-left iconHome me-2"></i>
              Logout
            </Button>
          )}

          {/* Pulsante Login */}
          {!isLoggedIn && (
            <Button className='iconHomeWrite' onClick={() => navigate("/login")}>
              <i className="bi bi-box-arrow-in-right iconHome me-2"></i>
              Login
            </Button>
          )}  
</Row>     
          </Col>
            <Col xs={8} md={8} lg={8} xl={8}>
            <div className="sezioneHomeCentrale">
              {/* <CentralSection /> */}


      <Card  className="offHomeSection ">
        <Card.Header>
          <Card.Title className='OffHomeTitle '>BENVENUTI A FUTURO IMPERFETTO 2.0 </Card.Title>
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
        <i className="iconHome prenotazioniWriteHome mb-4"><Button className='iconHomeWrite '
           onClick={() => {
            navigate("/reservation");
          }}>Prenotazioni </Button></i>

          {userRole === 'ADMIN' && (
            <Button
              onClick={() => {
            navigate("/reservationListPage");}}
             className='iconHomeWrite mb-4'> Lista prenotazioni</Button>
          )}


          </Row>
          


        </Card.Body>


<Card.Body>
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="iconHomeWrite iconHome">Contatti</Accordion.Header>
        <Accordion.Body>
        <Col  className="mt-3"><i className="bi bi-envelope-at">circolofuturoimperfetto@gmail.com</i></Col>
        <Col  className="mt-3"><i className="bi bi-telephone">   348 773 6697</i></Col>
        <Col  className="mt-3"><i className="bi bi-sign-turn-slight-right">   Via Bologna 26/28, Pescara, Italy</i></Col>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

</Card.Body>



      </Card>


              </div>
            </Col>
            <Col xs={2} md={2} lg={2} xl={2} className="colLoghiHome">
    <Row className="me-3">  
 <Col lg={6} xl={3} xxl={2}>
       <a href="https://www.facebook.com/futuroimperfetto2.0" className="loghiHome"> <i className="bi bi-facebook text-primary me-1  fs-2 mt-5 loghiHome "></i></a>
 </Col> 
 <Col lg={6} xl={2} xxl={2}>
       <a href="https://www.instagram.com/futuroimperfetto/" className="loghiHome2"><i className="bi bi-instagram text-danger fs-2 mt-5 loghiHome2"></i></a> 
 </Col>       
      </Row>   
            </Col>
          </Row>
<Row className="me-5">
<Col xs={2} md={2} lg={2} xl={2}></Col>
<Col xs={7} md={8} lg={8} xl={8}>
<Carousel>
      <Carousel.Item interval={3000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c8.jpg"} />
       
      </Carousel.Item>
      <Carousel.Item interval={3000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c2.jpg"} />
       
      </Carousel.Item>
      <Carousel.Item interval={3000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c3.jpg"} />
       
        </Carousel.Item>
        <Carousel.Item interval={3000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c4.jpg"} />
       
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      
        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c5.jpg"} />
       
      </Carousel.Item>

    </Carousel>

</Col>
<Col xs={4} md={2} lg={2} xl={2}></Col>

</Row>
          <Row>

<p className="futuroDescription">
Futuro Imperfetto 2.0 nasce il 14 settembre 2014 grazie gruppo di ragazzi che ogni mercoledì sera si riuniva in un garage, spartendosi in parti uguali l’affitto, per giocare da tavolo. 
Tanto erano presi da questa passione che il garage non bastava più.
Volevano un luogo accogliente dove riunirsi e che potesse accogliere nuov* giocator*.
E dove prima c’era una lavanderia hanno immaginato e poi creato il locale che conosciamo oggi.
Sono passati quasi 10 anni da allora, e a Futuro Imperfetto, la nostra amata nave volante, la passione per il gioco da tavolo è ancora il cuore pulsante del progetto. Cuore pulsante ma non unico motore. 
Da diversi anni infatti ospitiamo concerti, spettacoli teatrali, presentazioni di libri, esposizioni artistiche, incontri e tavoli di confronto su temi vari.
I principi che portiamo avanti sono quelli dell'inclusività e della condivisione.
Tutt* sono bene accolti sulla nave volante.
</p>

          </Row>

          <Row className="mt-5">
          <Col xs={2} md={2} lg={2} xl={2}></Col>
          <Col xs={7} md={8} lg={8} xl={8}>
<Carousel>
      <Carousel.Item interval={5000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c6.jpg"} />
       
      </Carousel.Item>
      <Carousel.Item interval={5000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c7.jpg"} />
       
      </Carousel.Item>
      <Carousel.Item interval={5000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c1.jpg"} />
       
        </Carousel.Item>
        <Carousel.Item interval={5000}>

        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c9.jpg"} />
       
      </Carousel.Item>
      <Carousel.Item interval={5000}>
      
        <Image className="imageCarousel" src={process.env.PUBLIC_URL + "/assets/c10.jpg"} />
       
      </Carousel.Item>

    </Carousel>

</Col>
<Col xs={4} md={2} lg={2} xl={2}></Col>

</Row>
        {/* </Container> */}
      </>
    );
  };
  
  export default Home;