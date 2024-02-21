import { useEffect, useState } from "react"
import "./ReservationSection.css"
import 'react-calendar/dist/Calendar.css';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ModalChooserGame from "./ModalChooserGame";


const ReservationSection = () =>{
  //per il gioco selezionato da prenotare
  const [selectedGame, setSelectedGame] = useState("");
  const [seats, setSeats] = useState(1); // Cambio dello stato da numberOfPeople a seats
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userData, setUserData] = useState(null);
  const [deskId, setDeskId] = useState(null);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  // const [desk, setDesk] = useState([])
  // const [game, setGame] = useState([])


  const reservationSubmit = () => {
    if (!selectedGame || !date || !time || !seats ) {
      alert("Si prega di compilare tutti i campi.");
      return;
    }

    // Effettua la richiesta per ottenere l'ID del desk
fetch(`${process.env.REACT_APP_BACKEND}/desk?seats=${seats}`)
.then((deskResponse) => {
  if (!deskResponse.ok) {
    throw new Error("Errore nel recupero dell'ID del desk");
  }
  return deskResponse.json();
})
.then((deskData) => {
  const deskId = deskData.id;
  if (!deskId) {
    throw new Error("ID del desk non trovato nella risposta");
  }

  // Effettua la richiesta per ottenere l'ID del gioco
  fetch(`${process.env.REACT_APP_BACKEND}/game?name=${selectedGame}`)
    .then((gameResponse) => {
      if (!gameResponse.ok) {
        throw new Error("Errore nel recupero dell'ID del gioco");
      }
      return gameResponse.json();
    })
    .then((gameData) => {
      const gameId = gameData.id;
      if (!gameId) {
        throw new Error("ID del gioco non trovato nella risposta");
      }

      // Continua con la logica della prenotazione utilizzando deskId e gameId
      const reservationData = {
        date: date,
        time: time,
        seats: seats,
        userId: userData.id,
        deskId: deskId,
        gameId: gameId
      };

      fetch(`${process.env.REACT_APP_BACKEND}/tableReservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
      })
      .then((reservationResponse) => {
        if (!reservationResponse.ok) {
          throw new Error("Errore durante la prenotazione");
        }
        setDate("");
        setTime("");
        setSeats(1);
        setSelectedGame("");
        setDeskId(null);
        setGameId(null);
        setUserData(null);
        alert("Prenotazione effettuata con successo!");
      })
      .catch((error) => {
        console.error("Errore durante la prenotazione:", error);
        alert("Si è verificato un errore durante la prenotazione. Si prega di riprovare più tardi.");
      });
    })
    .catch((error) => {
      console.error("Errore nel recupero dell'ID del gioco:", error);
      alert("Si è verificato un errore durante il recupero dell'ID del gioco.");
    });
})
.catch((error) => {
  console.error("Errore nel recupero dell'ID del desk:", error);
  alert("Si è verificato un errore durante il recupero dell'ID del desk.");
});
  
  }

    return(
        <>
        <Container className="container d-flex justify-content-center">
        <Row className="d-flex justify-content-center align-items-center">
        <Col xs={1} md={2} lg={2} xl={1}></Col>
        <Col xs={8} md={8} lg={8} xl={10}>
    <Card className="text-center prenotazioneCard">
      <Card.Header>Prenota Online</Card.Header>
      <Card.Body>
        <Card.Title>
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Nome utente</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="text" placeholder="Nome" value={userData ? userData.name : ""}/>
      </Form.Group>
        </Col>
        </Row>   
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Cognome utente</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="text" placeholder="Cognome" value={userData ? userData.surname : ""}/>
      </Form.Group>
        </Col>
        </Row> 

        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email utente</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="email" placeholder="email" value={userData ? userData.email : ""}/>
      </Form.Group>
        </Col>
        </Row> 

        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Numero persone</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="number" placeholder="Numero persone" max={10} min={1} 
          value={seats} onChange={(e) => setSeats(parseInt(e.target.value))}/>
      </Form.Group>
        </Col>
        </Row> 
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Data prenotazione</Form.Label>
       <Form.Control className="inputPrenotazione" size="sm" type="date" placeholder="Data prenotazione" 
        value={date} onChange={(e) => setDate(e.target.value)}
       /> 
      </Form.Group>
      
 
      </Col>
    </Row>
</Card.Title>
        <Card.Text className="cardTextTime">
        <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Dalle ore</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="time" placeholder="Dalle ore" 
          value={time} onChange={(e) => setTime(e.target.value)} 
        />
      </Form.Group>
        
        </Col>
        </Row> 
        {/* <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Alle ore</Form.Label>
        <Form.Control className="inputPrenotazione" size="sm" type="time" placeholder="Alle ore" />
      </Form.Group>
       
      </Col>
    </Row> */}

    

    <Row className="rowForInput">
        <Col xs={10} sm={8} md={8} xl={7}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Desideri prenotare un gioco da tavola?</Form.Label>
        <ModalChooserGame onGameSelect={(gameName) => setSelectedGame(gameName)}/>
        <Form.Control className="inputPrenotazione" size="sm" type="text" placeholder="" value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}/>
        
      </Form.Group>
      
      </Col>
    </Row>
        </Card.Text>
        <Card.Footer className="">
        Hai prenotato il giorno {date} alle ore {time} per {seats} persone. Il gioco selezionato è: {selectedGame}
        </Card.Footer>
        <Button className="buttonReservation"  onClick={reservationSubmit}>Conferma prenotazione</Button>
      </Card.Body>

    </Card>
    </Col>
        <Col xs={2} md={2} lg={2} xl={1}></Col>
</Row>
</Container>



        </>
    )
}

export default ReservationSection