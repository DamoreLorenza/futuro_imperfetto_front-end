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

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  // const [desk, setDesk] = useState([])
  // const [game, setGame] = useState([])


  const reservationSubmit = () => {
    let deskId; // Dichiaro deskId all'inizio della funzione per renderlo disponibile all'interno della catena delle promesse

    fetch(`${process.env.REACT_APP_BACKEND}/desk?seats=${seats}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
        },
    })
        .then((deskResponse) => {
            if (!deskResponse.ok) {
                throw new Error("Errore nel recupero dell'ID del desk");
            }
            return deskResponse.json();
        })
        .then((deskData) => {
            deskId = deskData.id; // Assegno deskId con il valore recuperato da deskData
            return fetch(`${process.env.REACT_APP_BACKEND}/game?name=${selectedGame}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                },
            });
        })
        .then((gameResponse) => {
            if (!gameResponse.ok) {
                throw new Error("Errore nel recupero dell'ID del gioco");
            }
            return gameResponse.json();
        })
        .then((gameData) => {
            const gameId = gameData.id;
            const reservationData = {
                date: date,
                time: time,
                seats: seats,
                userId: userData.id,
                deskId: deskId, // Utilizzo deskId qui all'interno della catena delle promesse
                gameId: gameId
            };

            return fetch(`${process.env.REACT_APP_BACKEND}/tableReservation`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationData)
            });
        })
        .then((reservationResponse) => {
            if (reservationResponse.ok) {
                alert("Prenotazione effettuata con successo!");
                // Effettua eventuali azioni aggiuntive dopo la prenotazione
            } else {
                throw new Error("Errore durante la prenotazione");
            }
        })
        .catch((error) => {
            console.error("Errore durante la gestione della prenotazione:", error);
            alert("Si è verificato un errore durante la gestione della prenotazione. Si prega di riprovare più tardi.");
        });
};


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